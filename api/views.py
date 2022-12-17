# from django.contrib.auth import authenticate, login, logout
# from django.http import HttpResponse, HttpResponseRedirect, JsonResponse

# from django.urls import reverse
# from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken

from .models import Post, Profile, Like, Dislike, Comment, User
from .serializers import PostSerializer, ProfileSerializer, LikeSerializer, DislikeSerializer, CommentSerializer, RegisterSerializers


# Register API


@api_view(["POST"])
def register(request):
    serializer = RegisterSerializers(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    _, token = AuthToken.objects.create(user)

    profile = Profile(
        user=user
    )
    profile.save()

    return Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        },
        'token': token
    })


@api_view(["POST"])
def login(request):
    serializer = AuthTokenSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']

    _, token = AuthToken.objects.create(user)
    return Response({
        'user_info': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        },
        'token': token
    })


@api_view(['GET'])
def get_user_data(request):
    user = request.user

    if user.is_authenticated:
        profile_raw = Profile.objects.get(user=user)
        profile = ProfileSerializer(profile_raw)

        # Get the Dislikes
        try:
            dislikes_raw = Dislike.objects.get(profile=profile_raw)
            one_dislike = DislikeSerializer(dislikes_raw).data
            dislikes = [one_dislike]
        except:
            dislikes_raw = Dislike.objects.filter(profile=profile_raw)
            dislikes = DislikeSerializer(dislikes_raw, many=True).data

        # Get the likes
        try:
            likes_raw = Like.objects.get(profile=profile_raw)
            one_like = LikeSerializer(likes_raw).data
            likes = [one_like]
        except:
            likes_raw = Like.objects.filter(profile=profile_raw)
            likes = LikeSerializer(likes_raw, many=True).data

        # get the comments
        try:
            comments_raw = Comment.objects.get(profile=profile_raw)
            one_comment = CommentSerializer(comments_raw).data
            comments = [one_comment]
        except:
            comments_raw = Comment.objects.get(profile=profile_raw)
            comments = CommentSerializer(comments_raw, many=True).data

        return Response({
            'user_info': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                "last_name": user.last_name,
                "profile_data": profile.data,
                "likes": likes,
                "dislikes": dislikes,
                "comments": comments,
            },
        })
    return Response({
        'error': "not authenticated"
    }, status=400)


@api_view(['GET'])
def index(request):
    return Response({"Hello": "World!"})


@api_view(['GET'])
def allPosts(request):
    posts = Post.objects.all().order_by('-timestamp')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def allProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def allLikes(request):
    likes = Like.objects.all()
    serializer = LikeSerializer(likes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def allDislikes(request):
    dislikes = Dislike.objects.all()
    serializer = DislikeSerializer(dislikes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def allComments(request):
    comments = Comment.objects.all()
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)
