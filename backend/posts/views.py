from django.contrib.auth.models import User
from rest_framework import permissions, viewsets

from posts.permissions import IsOwnerOrReadOnly
from posts.serializers import PostSerializer
from rest_framework.response import Response

from posts.models import Post
from auth.models import Account



class PostViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    serializer_class = PostSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly, )

    queryset = Post.objects.all()



    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        
        return  response

    def perform_create(self, serializer):
        disease_base = DiseaseBase.objects.filter(title = self.request.data.get("disease_base") ).first()
        serializer.save(owner=self.request.user, disease_base = disease_base)



    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        
        lat  = self.request.GET.get('lat')
        lang = self.request.GET.get('lang')

        return  response

