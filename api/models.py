from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.


class User(AbstractUser):
    pass


# Create category model
class Category(models.Model):
    name = models.CharField(max_length=280, default="")
    followers = models.ManyToManyField(
        "Profile", related_name="profileFollowing", null=True, blank=True)

    def __str__(self):
        return str(self.name)

# create profile model


class Profile(models.Model):
    user = models.ForeignKey(
        "User", on_delete=models.CASCADE, related_name="userProfile", null=True, blank=True)
    ctg_following = models.ManyToManyField(
        "Category", related_name="categoriesFollowing", null=True, blank=True)
    isTeacher = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)


# create post model


class Post(models.Model):
    isStudent = models.BooleanField(default=False)
    creator = models.ForeignKey(
        "Profile", on_delete=models.PROTECT, related_name="postCreator", null=True, blank=True)
    categories = models.ManyToManyField(
        "Category", related_name="postCategories", null=True, blank=True)
    title = models.CharField(max_length=100, default="")
    content = models.TextField(max_length=1000, default="")
    timestamp = models.DateTimeField(auto_now_add=True)
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return f"post by {self.creator}: {self.title}"


# Create likes, dislikes, comments and

class Like(models.Model):
    profile = models.ForeignKey(
        "Profile", on_delete=models.PROTECT, related_name="profile_like")
    timestamp = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(
        "Post", on_delete=models.PROTECT, related_name="post_like")

    def __str__(self):
        return f"liked by {self.profile} on {self.post}"


class Dislike(models.Model):
    profile = models.ForeignKey(
        "Profile", on_delete=models.PROTECT, related_name="profile_dislike")
    timestamp = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(
        "Post", on_delete=models.PROTECT, related_name="post_dislike")

    def __str__(self):
        return f"disliked by {self.profile} on {self.post}"


class Comment(models.Model):
    profile = models.ForeignKey(
        "Profile", on_delete=models.PROTECT, related_name="profile_comment")
    timestamp = models.DateTimeField(auto_now_add=True)
    post = models.ForeignKey(
        "Post", on_delete=models.PROTECT, related_name="post_comment")
    content = models.CharField(max_length=280, default="")

    def __str__(self):
        return f"commented by {self.profile} on {self.post}"
