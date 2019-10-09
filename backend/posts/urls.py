from posts import views
from rest_framework.routers import DefaultRouter
from django.conf.urls import include
from django.urls import path


# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'', views.PostViewSet,'post')


# The API URLs are now determined automatically by the router.
urlpatterns = [
    path(r'', include(router.urls),name='posts'),
]
