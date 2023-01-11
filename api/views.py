# from django.contrib.auth import authenticate, login, logout
# from django.http import HttpResponse, HttpResponseRedirect, JsonResponse

# from django.urls import reverse
# from django.core.serializers import serialize
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.auth import AuthToken

from .models import Post, Profile, Like, Dislike, Comment, User, Category
from .serializers import PostSerializer, ProfileSerializer, LikeSerializer, DislikeSerializer, CommentSerializer, RegisterSerializers, CategorySerializer


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
            comments_raw = Comment.objects.filter(profile=profile_raw)
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
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def allCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def postData(request):
    data = request.data
    try:
        likes_raw = Like.objects.get(post=data["post_id"])
        one_like = LikeSerializer(likes_raw).data
        likes = [one_like]
    except:
        likes_raw = Like.objects.filter(post=data["post_id"])
        likes = LikeSerializer(likes_raw, many=True).data

    try:
        dislikes_raw = Dislike.objects.get(post=data["post_id"])
        one_dislike = DislikeSerializer(dislikes_raw).data
        dislikes = [one_dislike]
    except:
        dislikes_raw = Dislike.objects.filter(post=data["post_id"])
        dislikes = DislikeSerializer(dislikes_raw, many=True).data

    try:
        comments_raw = Comment.objects.get(post=data["post_id"])
        one_comment = CommentSerializer(comments_raw).data
        comments = [one_comment]
    except:
        comments_raw = Comment.objects.filter(post=data["post_id"])
        comments = CommentSerializer(comments_raw, many=True).data
    # comments = Comment.objects.get()
    return Response({
        "likes": likes,
        "dislikes": dislikes,
        "comments": comments
    })


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


@api_view(["POST"])
def like(request):
    data = request.data
    unlike = data["unlike"]
    postIm = data["post"]
    postId = postIm["id"]
    currentUser = data["user"]
    userId = currentUser["id"]

    user = User.objects.get(id=userId)
    post = Post.objects.get(id=postId)
    profile = Profile.objects.get(user=user)

    if unlike:
        # Look for the like
        like = Like.objects.get(post=post, profile=profile)
        # delete it
        like.delete()
    else:
        like = Like(
            profile=profile,
            post=post
        )
        like.save()
    return Response(request.data)


@api_view(["POST"])
def dislike(request):
    data = request.data
    undislike = data["undislike"]
    postIm = data["post"]
    postId = postIm["id"]
    currentUser = data["user"]
    userId = currentUser["id"]

    user = User.objects.get(id=userId)
    post = Post.objects.get(id=postId)
    profile = Profile.objects.get(user=user)

    if undislike:
        # Look for the dislike
        dislike = Dislike.objects.get(post=post, profile=profile)
        # delete it
        dislike.delete()
    else:
        dislike = Dislike(
            profile=profile,
            post=post
        )
        dislike.save()
    return Response(request.data)


@api_view(["POST"])
def addComment(request):
    data = request.data
    postIm = data["post"]
    postId = postIm["id"]
    currentUser = data["profile"]
    userId = currentUser["id"]
    content = data["content"]

    user = User.objects.get(id=userId)
    post = Post.objects.get(id=postId)
    profile = Profile.objects.get(user=user)

    comment = Comment(
        profile=profile,
        post=post,
        content=content
    )
    comment.save()
    return Response(request.data)


@api_view(["POST"])
def newPost(request):
    data = request.data  # done
    content = data["content"]  # done
    title = data["question"]  # done
    currentUser = data["creator"]
    userId = currentUser["id"]
    isStudent = data["isStudent"]  # done
    postCat = data["categories"]  # done

    user = User.objects.get(id=userId)  # done
    profile = Profile.objects.get(user=user)

    newPost = Post.objects.create(
        isStudent=isStudent,
        creator=profile,
        title=title,
        content=content
    )
    # done
    for category in postCat:
        dbcategory = Category.objects.get(pk=category["id"])
        newPost.categories.add(dbcategory)

    return Response(data)


@api_view(["POST"])
def follow(request):
    category = request.data
    dbcategory = Category.objects.get(pk=category["id"])
    currentUser = category["user"]
    userId = currentUser["id"]

    user = User.objects.get(id=userId)
    profile = Profile.objects.get(user=user)

    profile.ctg_following.add(dbcategory)
    dbcategory.followers.add(profile)
    return Response(category)


@api_view(["POST"])
def unfollow(request):
    category = request.data
    dbcategory = Category.objects.get(pk=category["id"])
    currentUser = category["user"]
    userId = currentUser["id"]

    user = User.objects.get(id=userId)
    profile = Profile.objects.get(user=user)

    profile.ctg_following.remove(dbcategory)
    dbcategory.followers.remove(profile)
    return Response(request.data)
