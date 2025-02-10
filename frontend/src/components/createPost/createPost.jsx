import React, { useState } from 'react';
import { Loader2, SendHorizontal, AlertCircle } from 'lucide-react';

const CreatePost = ({ fetchPosts }) => {
  const [points, setPoints] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(null);
  const token = localStorage.getItem("access_token");

  const handlePointChange = (index, value) => {
    setPoints(points.map((p, i) => i === index ? value : p));
  };

  const areAllPointsFilled = points.every(point => point.trim() !== '');
  const filledCount = points.filter(point => point.trim()).length;

  const handleSubmit = async () => {
    if (!token) {
      setError('Please log in to create a post');
      return;
    }
    if (!areAllPointsFilled) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: points.join('\n') }),
      });

      if (!response.ok) throw new Error('Failed to create post');

      await response.json();
      setPoints(['', '', '']);
      fetchPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-6">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Share your thoughts
          </h3>
          
          <div className="space-y-4">
            {points.map((point, index) => (
              <div key={index} className="relative">
                <textarea
                  id={`point-${index}`}
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  placeholder={`Point ${index + 1} of 3...`}
                  rows={2}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-lg
                    placeholder-gray-400 text-gray-800 resize-none
                    transition-all duration-200
                    ${focusedIndex === index ? 'border-blue-500 ring-2 ring-blue-100 bg-white' : 'border-gray-200'}
                    ${point.trim() ? 'border-green-200' : ''}
                    focus:outline-none`}
                />
                <div className="absolute right-3 top-3">
                  {point.trim() && (
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-lg flex items-center space-x-2 text-rose-600">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={!areAllPointsFilled || !token || loading}
              className={`w-full flex items-center justify-center space-x-2 
                py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${!areAllPointsFilled || !token 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-sm hover:shadow'}`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{token ? `Share ${filledCount}/3 points` : 'Login to post'}</span>
                  <SendHorizontal className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;