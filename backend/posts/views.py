import logging


from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Post, Category, Configration
from .serializers import PostSerializer, CategorySerializer
from .repository import get_group_posts_from_fb



@api_view(['GET'])
def get_last_run(request):
    """
    get the last time we fetched the facebook group posts
    the time returned is the number of seconds from epoch
    """
    last_run = Configration.objects.get(key="last_run")
    if last_run:
        return Response({"last_run": last_run.value}, status=status.HTTP_200_OK)
    else:
        return Response("last_run hasn't been added yet",
            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def fetch_latest_posts(request):
    """
    Call the facebook graph API to get the latest posts
    """
    succeeded, posts_count = get_group_posts_from_fb()
    if succeeded:
        return Response({"message": "done", "posts_count": posts_count},
            status=status.HTTP_200_OK)
    else:
        return Response({"message": "error calling Facbook API"},
            status=status.HTTP_400_BAD_REQUEST)


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Post.objects.all().order_by('-updated_time')
    serializer_class = PostSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
