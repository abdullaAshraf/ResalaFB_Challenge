from django.urls import path
from .views import SocialLoginView

urlpatterns = [
    path('oauth/login/', SocialLoginView.as_view())
]
