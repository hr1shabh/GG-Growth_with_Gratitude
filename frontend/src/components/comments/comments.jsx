import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { SendHorizontal, Loader2, Trash2, X, Check } from 'lucide-react';
import API_BASE_URL from "../../apiConfig";

const Comments = ({ postId }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchComments = React.useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${API_BASE_URL}/api/posts/${postId}/comments/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(response.data);
    } catch (err) {
      setError("Couldn't load comments");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (postId) fetchComments();
  }, [postId, fetchComments]);

  const postComment = async () => {
    if (!newComment.trim()) return;
    setPosting(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `${API_BASE_URL}/api/posts/${postId}/comments/`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      setError("Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteClick = (e, commentId) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmDeleteId(commentId);
  };

  const handleDeleteConfirm = async (e, commentId) => {
    e.stopPropagation();
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) return;

    setDeletingId(commentId);
    try {
      await axios.delete(
        `${API_BASE_URL}/api/posts/${postId}/comments/${commentId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComments();
    } catch (err) {
      setError("Failed to delete comment");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const handleDeleteCancel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setConfirmDeleteId(null);
  };

  const getInitials = email => {
    if (!email) return "";
    return email.split("@")[0].charAt(0).toUpperCase();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      postComment();
    }
  };

  const isCommentOwner = (comment) => {
    return currentUser && comment.user && currentUser.id === comment.user.id;
  };

  return (
    <div className="space-y-4">
      {currentUser && (
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
            {getInitials(currentUser.email)}
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Write a comment..."
              className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={handleKeyPress}
              rows={2}
            />
            <div className="mt-2 flex justify-between items-center">
              <span className="text-xs text-gray-400">Press Enter to post</span>
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                onClick={postComment}
                disabled={!newComment.trim() || posting}
              >
                {posting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Post</span>
                    <SendHorizontal className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex space-x-3 animate-fadeIn group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                {getInitials(comment.user.profile || comment.user.email)}
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg px-4 py-3 shadow-sm relative">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900 mb-1">
                      {comment.user.profile || comment.user.email.split("@")[0]}
                    </div>
                    {isCommentOwner(comment) && (
                      <div className="flex items-center space-x-1">
                        {confirmDeleteId === comment.id ? (
                          <>
                            <button
                              onClick={(e) => handleDeleteConfirm(e, comment.id)}
                              disabled={deletingId === comment.id}
                              className="p-1 text-white bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200"
                              title="Confirm delete"
                            >
                              {deletingId === comment.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )}
                            </button>
                            <button
                              onClick={handleDeleteCancel}
                              disabled={deletingId === comment.id}
                              className="p-1 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-full transition-all duration-200"
                              title="Cancel"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={(e) => handleDeleteClick(e, comment.id)}
                            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                            title="Delete comment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;