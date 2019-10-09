from django.urls import path,include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token
from auth import views

urlpatterns = [
    path('register/', views.UserRegister.as_view(),name='register'),
    path('change-password/', views.UserChangePassword.as_view(),name='ChangePassword'),
    path('forget-password/', views.UserForgetPassword.as_view(), name="ForgetPassword"),
    path('reset/<uidb64>/<token>/',views.PasswordResetConfirmView.as_view(),name='password_reset_confirm'),
    path('jwt-api-token/', obtain_jwt_token,name='jwt_token'),
    path('browsable-API/', include('rest_framework.urls')),
]

urlpatterns = format_suffix_patterns(urlpatterns)