from django.urls import path
from . import views
from .views import CommentListCreateView


urlpatterns = [
    path('posts/', views.post_list, name='post_list'),  # For GET and POST methods
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),  # For GET, PUT, DELETE
    path('posts/<int:post_id>/comments/', CommentListCreateView.as_view(), name='comments-list-create'),
]
