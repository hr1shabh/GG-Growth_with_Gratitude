from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Post, Comment, Like
from .serializers import PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def post_list(request):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Add the authenticated user to the request data
        data = request.data.copy()
        data['user'] = request.user.id  # Associate the authenticated user

        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def post_detail(request, pk):
    try:
        post = Post.objects.get(pk=pk)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        """Retrieve all comments for a specific post."""
        try:
            # Check if the post exists
            post = get_object_or_404(Post, id=post_id)
            comments = Comment.objects.filter(post=post)
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            # Handle unexpected errors
            return Response(
                {'error': 'An error occurred while fetching comments.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request, post_id):
        """Create a new comment for a specific post."""
        try:
            # Check if the post exists
            post = get_object_or_404(Post, id=post_id)
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user, post=post)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                # Return validation errors
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle unexpected errors
            return Response(
                {'error': 'An error occurred while creating the comment.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )




class LikePostView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, post_id):
        """Check if the user has liked the post."""
        post = get_object_or_404(Post, id=post_id)
        has_liked = Like.objects.filter(user=request.user, post=post).exists()
        return Response({'has_liked': has_liked}, status=status.HTTP_200_OK)

    def post(self, request, post_id):
        """Toggle like/unlike a post and return the updated like status."""
        post = get_object_or_404(Post, id=post_id)
        like, created = Like.objects.get_or_create(user=request.user, post=post)

        if not created:
            # If the like already exists, delete it (unlike)
            like.delete()
            has_liked = False
            message = 'Post unliked'
        else:
            # If the like was just created, return a liked message
            has_liked = True
            message = 'Post liked'

        return Response({'message': message, 'has_liked': has_liked}, status=status.HTTP_200_OK)