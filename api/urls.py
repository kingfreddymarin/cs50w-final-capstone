from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('user/', views.get_user_data, name="user"),
    path('logout/', knox_views.LogoutView.as_view(), name="user"),
    # This route will work to log out the users from any device
    # path('logout-all/', knox_views.LogoutAllView.as_view(), name="user"),
    # API's
    path('', views.index, name="index"),
    path('all-posts/', views.allPosts, name="allPosts"),
    path('all-profiles/', views.allProfiles, name="allProfiles"),
    path('all-likes/', views.allLikes, name="allLikes"),
    path('all-dislikes/', views.allDislikes, name="allDislikes"),
    path('all-comments/', views.allComments, name="allComments"),
    path('all-categories', views.allCategories, name="allCategories"),
    path('postData/', views.postData, name="postData"),
    path('like/', views.like, name="like"),
    path('dislike/', views.dislike, name="dislike"),
    path('addComment/', views.addComment, name="addComment"),
    path('new-post/', views.newPost, name="newPost"),
    path('follow/', views.follow, name="follow"),
    path('unfollow/', views.unfollow, name="unfollow")

]
