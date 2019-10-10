from django.urls import include, path

from . import views

from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'', views.PostViewSet)

urlpatterns = [
    path('fetch-latest-posts/', views.fetch_latest_posts, name='get-latest-posts'),
    path('get-last-run/', views.get_last_run, name='get-last-run'),
    path('', include(router.urls)),

]