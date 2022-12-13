from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('all-posts', views.allPosts, name="allPosts"),
    path('all-profiles', views.allProfiles, name="allProfiles"),
    path('all-likes', views.allLikes, name="allLikes"),
    path('all-dislikes', views.allDislikes, name="allDislikes"),
    path('all-comments', views.allComments, name="allComments")
]
