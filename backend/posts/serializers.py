from django.contrib.auth.models import User
from rest_framework import serializers

from posts.models import Post


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    created = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """

        return Post.objects.create(**validated_data)


    class Meta:
        model = Post
        fields = "__all__"
        depth  = 1 # generate nested representations
