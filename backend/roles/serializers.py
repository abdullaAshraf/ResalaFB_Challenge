from .models import Role
from rest_framework import serializers


class RoleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"

