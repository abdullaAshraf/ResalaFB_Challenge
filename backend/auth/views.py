from django.shortcuts import render
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template import loader
from django.core.mail import send_mail
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from auth.serializers import *

from auth.models import Account

class UserRegister(generics.CreateAPIView):
    """
    Register new User.
    POST : username ,password
    """

    serializer_class = UserSerializer

    def perform_create(self, serializer):

        serializer.save()



class UserChangePassword(APIView):
    """
    Allow current User to change password.

    POST : old_password, new_password
    """

    permission_classes = (permissions.IsAuthenticated, )

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]},
                                status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserForgetPassword(APIView):
    """
    Allow current User to enter email to send
    him email to reset password

    POST : email
    """

    def post(self, request, *args, **kwargs):
        """A normal post request which takes input email."""

        serializer = ForgetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get("email")
            try:
                associated_user = User.objects.get(email=email)
            except User.DoesNotExist:
                associated_user = None
            if associated_user:
                context = {
                    'email': associated_user.email,
                    'domain': request.META['HTTP_HOST'],
                    'site_name': 'blog',
                    'uid': urlsafe_base64_encode(force_bytes(associated_user.pk)).decode(),
                    'user': associated_user,
                    'token': default_token_generator.make_token(associated_user),
                    'protocol': self.request.scheme,
                    }
                subject_template_name = 'registration/password_reset_subject.txt'
                # copied from django/contrib/admin/templates/registration/password_reset_subject.txt to templates directory
                email_template_name = 'registration/password_reset_email.html'
                # copied from django/contrib/admin/templates/registration/password_reset_email.html to templates directory
                subject = loader.render_to_string(subject_template_name, context)
                # Email subject *must not* contain newlines
                subject = ''.join(subject.splitlines())
                email = loader.render_to_string(email_template_name, context)

                send_mail(subject, email, settings.DEFAULT_FROM_EMAIL, [associated_user.email], fail_silently=False)
                success_message = 'An email has been sent to ' + associated_user.email + '. Please check its inbox to continue reseting password.'
                return Response({"output": [success_message]}, status=status.HTTP_200_OK)
            else:
                fail_message = 'No user is associated with this email address'
                return Response({"output": [fail_message]}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    """
    View that checks the hash in a password reset link and validate new password.

    POST : new_password1 ,new_password2
    """
    token_generator = default_token_generator

    def post(self, request, *arg, **kwargs):
        """A normal post request which takes two password fields."""

        assert 'uidb64' in kwargs and 'token' in kwargs
        serializer = SetPasswordSerializer(data=request.data)
        user = self.get_user(kwargs['uidb64'])

        if user is not None:
            token = kwargs['token']
            if self.token_generator.check_token(user, token):
                if serializer.is_valid():
                    new_password = serializer.data.get("new_password1")
                    user.set_password(new_password)
                    user.save()
                    return Response({"output": ['Password has been reset.']}, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
            return Response({"output": ['The reset password link is no longer valid.']}, status=status.HTTP_404_NOT_FOUND)
        return Response({"output": ['The link is not valid.']}, status=status.HTTP_404_NOT_FOUND)

    def get_user(self, uidb64):
        UserModel = get_user_model()
        try:
            # urlsafe_base64_decode() decodes to bytestring
            uid = urlsafe_base64_decode(uidb64).decode()
            user = UserModel._default_manager.get(pk=uid)
        except (TypeError, ValueError, OverflowError, UserModel.DoesNotExist, ValidationError):
            user = None
        return user
