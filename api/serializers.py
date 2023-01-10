from rest_framework import serializers, validators
from .models import Post, Profile, Like, Dislike, Comment, User, Category


class RegisterSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name')

        extra_kwargs = {
            "password": {"write_only": True},
            "email": {
                "required": True,
                "validators": [
                    validators.UniqueValidator(
                        User.objects.all(), "A user with that Email already exists"
                    )
                ]
            }
        }

    def create(self, validated_data):
        username = validated_data.get('username')
        email = validated_data.get('email')
        password = validated_data.get('password')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')

        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

        return user


class PostSerializer(serializers.ModelSerializer):
    # creator = serializers.ReadOnlyField(source='creator.user.username')
    # likes = serializers.StringRelatedField(many=True)
    # dislikes = serializers.StringRelatedField(many=True)
    categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = Post
        fields = ('id', 'isStudent', 'creator', 'categories', 'title',
                  'content', 'timestamp', 'isActive')


class ProfileSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'ctg_following', 'isTeacher')


class LikeSerializer(serializers.ModelSerializer):
    # user = serializers.ReadOnlyField(source='user.username')
    profile = serializers.ReadOnlyField(source='profile.user.username')
    # ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Like
        fields = ('id', 'timestamp', 'profile', 'post')


class DislikeSerializer(serializers.ModelSerializer):
    profile = serializers.ReadOnlyField(source='profile.user.username')
    # ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Dislike
        fields = ('id', 'timestamp', 'profile', 'post')


class CommentSerializer(serializers.ModelSerializer):
    profile = serializers.ReadOnlyField(source='profile.user.username')
    # ctg_following = serializers.StringRelatedField(many=True)

    class Meta:
        model = Comment
        fields = ('id', 'timestamp', 'profile', 'post', 'content')


class CategorySerializer(serializers.ModelSerializer):
    # profile = serializers.ReadOnlyField(source='profile.user.username')
    followers = serializers.StringRelatedField(many=True)

    class Meta:
        model = Category
        fields = ('id', 'name', 'followers')
