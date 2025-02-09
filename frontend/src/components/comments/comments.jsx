import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Comments = ({ postId }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch comments for the given post
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `http://localhost:8000/api/posts/${postId}/comments/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(response.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError("Failed to fetch comments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Post a new comment
  const postComment = async () => {
    if (!newComment.trim()) return;
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `http://localhost:8000/api/posts/${postId}/comments/`,
        { content: newComment }, // Send only the comment content
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setNewComment(""); // Clear the input field
      fetchComments();   // Re-fetch comments to update the UI
    } catch (err) {
      console.error("Error posting comment:", err.response?.data || err);
      setError("Failed to post comment.");
    }
  };

  // Function to generate initials from email
  const getInitials = (email) => {
    if (!email) return "";
    const [name] = email.split("@");
    const initials = name
      .split(".")
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  return (
    <div className="space-y-4 p-4">
      <div className="write flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
        {currentUser && (
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
            {getInitials(currentUser.email)}
          </div>
        )}
        <input
          type="text"
          placeholder="Write a comment"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={postComment}
        >
          Post
        </button>
      </div>

      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
        >
          <div className="flex items-center p-4 bg-gray-100 border-b border-gray-200">
            {comment.user.profile ? (
              <img
                src={comment.user.profile}
                alt="profile"
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                {getInitials(comment.user.email)}
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-800">
              {comment.user.email.split("@")[0]} {/* Display email prefix as profile name */}
            </h2>
          </div>
          <div className="p-4">
            <p className="text-gray-600">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;