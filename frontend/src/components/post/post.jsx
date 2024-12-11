import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Comments from '../comments/comments';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleCommentToggle = () => {
    setIsCommented(!isCommented);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md mx-auto my-4 border border-gray-200">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Link 
            to={`/profile/${post.userId}`} 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {post.name[0].toUpperCase()}
            </div>
            <div>
              <span className="font-semibold text-gray-800">{post.name}</span>
            </div>
          </Link>
          <span className="text-sm text-gray-500">{post.date}</span>
        </div>
      </div>
      
      {/* Post Content */}
      <div className="p-4 bg-gray-50">
        <div className="space-y-2 text-gray-700">
          {[post.Gratitudepoint1, post.Gratitudepoint2, post.Gratitudepoint3].map((point, index) => (
            <p 
              key={index}
              className="before:content-['\201C'] before:text-gray-400 before:text-3xl before:mr-1 
                          after:content-['\201D'] after:text-gray-400 after:text-3xl after:ml-1"
            >
              {point}
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
            <span className="text-sm">{isLiked ? 'Liked' : 'Like'}</span>
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
          <Comments comments={post.comments} />
        </div>
      )}
    </div>
  );
};

export default Post;