from rest_framework import serializers
from .models import Post, Profile, Like, Dislike, Comment


class PostSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source='creator.user.username')
    likes = serializers.StringRelatedField(many=True)
    dislikes = serializers.StringRelatedField(many=True)
    categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = ('id', 'isStudent', 'content', 'timestamp', 'likes',
                  'dislikes', 'creator', 'categories', 'isActive')


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'ctg_following')
