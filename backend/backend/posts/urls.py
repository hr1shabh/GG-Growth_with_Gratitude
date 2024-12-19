from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.post_list, name='post_list'),  # For GET and POST methods
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),  # For GET, PUT, DELETE
]
