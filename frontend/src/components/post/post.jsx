import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Comments from '../comments/comments';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isCommented, setIsCommented] = useState(false);

  // Fetch like status for the current user
  useEffect(() => {
    if (!post) return; // Early return if post is not available

    const fetchLikeStatus = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/${post.id}/like/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch like status');
        }

        const data = await response.json();
        setIsLiked(data.is_liked);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikeStatus();
  }, [post]); // Add `post` as a dependency

  if (!post) {
    return <div>No post data available</div>;
  }

  const handleLikeToggle = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert('Please log in to like posts.');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/posts/${post.id}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }

      const data = await response.json();
      setIsLiked(!isLiked);
      setLikesCount(data.likes_count);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentToggle = () => {
    setIsCommented(!isCommented);
  };

  // Get user's email initial safely
  const getInitial = (email) => {
    return email && typeof email === 'string' ? email[0].toUpperCase() : '?';
  };

  // Format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md mx-auto my-4 border border-gray-200">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link 
            to={`/profile/${post.user}`} 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {getInitial(post.user)}
            </div>
            <div>
              <span className="font-semibold text-gray-800">{post.user}</span>
            </div>
          </Link>
          <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="p-4 bg-gray-50">
        <div className="space-y-2 text-gray-700">
          {post.content.split('\n').map((sentence, index) => (
            <p key={index} className="text-base leading-relaxed">
              {sentence.trim()}
            </p>
          ))}
        </div>
      </div>
      
      {/* Post Interactions */}
      <div className="flex justify-between items-center p-4 bg-white border-t border-gray-100">
        <div className="flex space-x-4 items-center">
          {/* Like Button */}
          <button 
            onClick={handleLikeToggle} 
            className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart 
              className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'fill-none'}`}
              strokeWidth={2}
            />
            <span className="text-sm">{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
          </button>
          
          {/* Comment Button */}
          <button 
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors" 
            onClick={handleCommentToggle}
          >
            <MessageCircle className="w-6 h-6" strokeWidth={2} />
            <span className="text-sm">Comment</span>
          </button>
          
          {/* Share Button */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
            <Share2 className="w-6 h-6" strokeWidth={2} />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
      
      {/* Comments Section */}
      {isCommented && (
        <div className="p-4 border-t border-gray-100">
          <Comments postId={post.id} />
        </div>
      )}
    </div>
  );
};

export default Post;