from rest_framework import serializers
from .models import Post, Profile, Like, Dislike, Comment


class PostSerializer(serializers.ModelSerializer):
    # creator = serializers.ReadOnlyField(source='creator.user.username')
    # likes = serializers.StringRelatedField(many=True)
    # dislikes = serializers.StringRelatedField(many=True)
    # categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = ('id', 'isStudent', 'creator', 'categories', 'title',
                  'content', 'timestamp', 'isActive')


class ProfileSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'ctg_following')


class LikeSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Like
        fields = ('id', 'timestamp', 'profile', 'post')


class DislikeSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Dislike
        fields = ('id', 'timestamp', 'profile', 'post')


class CommentSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    # ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Comment
        fields = ('id', 'timestamp', 'profile', 'post', 'content')
