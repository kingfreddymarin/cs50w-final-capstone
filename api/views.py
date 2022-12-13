# from django.contrib.auth import authenticate, login, logout
# from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.contrib.auth import authenticate, login, logout

# from django.urls import reverse
# from django.core.serializers import serialize
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post, Profile, Like, Dislike, Comment, User
from .serializers import PostSerializer, ProfileSerializer, LikeSerializer, DislikeSerializer, CommentSerializer

# Register API


def register(request):
    username = request.data["username"]
    email = request.data["email"]
    password = request.data["password"]
    confirmation = request.data["confirmation"]
    if password != confirmation:
        return Response("password must match its confirmation")
    try:
        user = User.objects.create_user(username, email, password)
        profile = Profile(user=user)
        user.save()
        profile.save()
    except:
        return Response("Username already taken")
    login(request, user)
    return Response("logged in")


def login(request):
    username = request.data["username"]
    password = request.data["password"]
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response("logged in")
    else:
        return Response("Invalid username/password")


def logout_f(request):
    logout(request)
    return Response("boom")


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
