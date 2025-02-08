from rest_framework import serializers
from .models import Post, Comment, Like
from users.models import User
from django.contrib.auth import get_user_model

User = get_user_model()  # Import the User model from AUTH_USER_MODEL

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'password', 'profile']  # Add other fields like profile_picture if needed

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # For reading user details
    
    class Meta:
        model = Post
        fields = ["id", "user", "content", "created_at"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        # Get the user from the context
        user = self.context['request'].user
        # Create the post with the user
        post = Post.objects.create(user=user, **validated_data)
        return post

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'content', 'created_at']
        extra_kwargs = {
            'user': {'read_only': True},
            'post': {'read_only': True},
        }



class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'post', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
