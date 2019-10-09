from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from auth.models import Account

class UserSerializer(serializers.ModelSerializer):
    """Serializer to map the Model instance into JSON format."""
    class Meta:
        model = User
        fields = ('username','email', 'password')

    def create(self, validated_data):
        """
        Create and return a new `User` instance, given the validated data.
        """

        user_data = {
            "username"  :   validated_data.get("username"),
            "email"     :   validated_data.get("email"),
            "password"  :   validated_data.get("password")
        }
        user = User.objects.create_user(**user_data)
        user.save()

        account = Account(user = user)
        account.save()

        return user


    def validate_password(self, value):
        validate_password(value)
        return value


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value




class ForgetPasswordSerializer(serializers.Serializer):
    """
    Serializer for foregt password endpoint.
    """
    email = serializers.EmailField(required=True)


class SetPasswordSerializer(serializers.Serializer):
    """
    Serializer for setting password endpoint.
    """

    new_password1 = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)

    def validate(self, data):
        """
        Check that password is match.
        """
        password1 = data['new_password1']
        password2 = data['new_password2']

        if password1 and password2 :
            if password1 != password2 :
                raise serializers.ValidationError("password doen't match")
        validate_password(password1)
        return data

