# from django.contrib.auth import authenticate, login, logout
# from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
# from django.urls import reverse
# from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post, Profile, Like, Dislike, Comment
from .serializers import PostSerializer, ProfileSerializer, LikeSerializer, DislikeSerializer, CommentSerializer

# from .serializers import *


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
