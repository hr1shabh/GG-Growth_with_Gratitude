import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Loader2 } from 'lucide-react';
import Comments from '../comments/comments';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!post) return;
    const fetchLikeStatus = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      try {
        const response = await fetch(`https://my-django-app-vpvk.onrender.com/api/posts/${post.id}/like/`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch like status');
        const data = await response.json();
        setIsLiked(data.has_liked);
        setLikeCount(data.like_count || 0);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchLikeStatus();
  }, [post]);

  const handleLikeToggle = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert('Please log in to like posts.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`https://my-django-app-vpvk.onrender.com/api/posts/${post.id}/like/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to toggle like');
      const data = await response.json();
      setIsLiked(data.has_liked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getInitial = email => email?.[0]?.toUpperCase() || '?';
  
  const formatDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60));
        return `${minutes}m ago`;
      }
      return `${hours}h ago`;
    }
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (!post) return (
    <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
      <span className="text-gray-500">No post data available</span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden max-w-2xl mx-auto my-6 border border-gray-100">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <Link to={`/profile/${post.user.id}`} 
          className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold transform group-hover:scale-105 transition-transform">
            {getInitial(post.user.email)}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {post.user.profile || post.user.email.split("@")[0]}
            </span>
            <span className="text-xs text-gray-500">{formatDate(post.created_at)}</span>
          </div>
        </Link>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <div className="space-y-2 text-gray-800">
          {post.content.split('\n').map((sentence, index) => (
            <p key={index} className="text-base leading-relaxed">
              {sentence.trim()}
            </p>
          ))}
        </div>
      </div>

      {/* Interaction Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
        <div className="flex space-x-6">
          <button 
            onClick={handleLikeToggle}
            disabled={isLoading}
            className="group flex items-center space-x-2"
          >
            <div className="relative">
              <Heart 
                className={`w-6 h-6 transition-all duration-300 transform group-hover:scale-110 
                  ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-500 group-hover:text-rose-500'}`}
                strokeWidth={2}
              />
              {isLoading && (
                <Loader2 className="w-6 h-6 absolute inset-0 animate-spin text-gray-400" />
              )}
            </div>
            <span className={`text-sm ${isLiked ? 'text-rose-500' : 'text-gray-500 group-hover:text-rose-500'}`}>
              {likeCount > 0 ? likeCount : 'Like'}
            </span>
          </button>

          <button 
            onClick={() => setIsCommented(!isCommented)}
            className="group flex items-center space-x-2"
          >
            <MessageCircle 
              className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors" 
              strokeWidth={2}
            />
            <span className="text-sm text-gray-500 group-hover:text-blue-500">Comment</span>
          </button>

          <button className="group flex items-center space-x-2">
            <Share2 
              className="w-6 h-6 text-gray-500 group-hover:text-green-500 transition-colors" 
              strokeWidth={2}
            />
            <span className="text-sm text-gray-500 group-hover:text-green-500">Share</span>
          </button>
        </div>
      </div>

      {/* Comments */}
      {isCommented && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="p-4">
            <Comments postId={post.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;