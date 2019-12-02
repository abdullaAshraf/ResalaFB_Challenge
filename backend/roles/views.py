from django.shortcuts import render

from rest_framework import viewsets
from .serializers import RoleSerializer
from .models import Role
# Create your views here.


class RoleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Roles to be viewed or edited.
    """
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
