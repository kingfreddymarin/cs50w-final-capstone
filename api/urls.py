from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout_f, name='logout'),
    # API's
    path('', views.index, name="index"),
    path('all-posts/', views.allPosts, name="allPosts"),
    path('all-profiles/', views.allProfiles, name="allProfiles"),
    path('all-likes/', views.allLikes, name="allLikes"),
    path('all-dislikes/', views.allDislikes, name="allDislikes"),
    path('all-comments/', views.allComments, name="allComments")
]
