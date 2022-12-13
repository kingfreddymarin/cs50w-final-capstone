from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('all-posts', views.allPosts, name="allPosts"),
    path('all-profiles', views.allProfiles, name="allProfiles"),

]
