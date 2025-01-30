import React, { useState } from 'react';

const CreatePost = () => {
    const [points, setPoints] = useState(['', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Retrieve token from localStorage
    const token = localStorage.getItem("access_token");

    // Update a specific point by index
    const handlePointChange = (index, value) => {
        const newPoints = [...points];
        newPoints[index] = value;
        setPoints(newPoints);
    };

    // Check if all points are filled
    const areAllPointsFilled = points.every(point => point.trim() !== '');

    // Handle post submission
    const handleSubmit = async () => {
        if (!token) {
            setError('User is not authenticated. Please log in.');
            return;
        }

        if (!areAllPointsFilled) return;

        setLoading(true);
        setError('');

        const postData = {
            content: points.join('\n'),
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/posts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Fetch token from localStorage
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const data = await response.json();
            console.log('Post created successfully:', data);

            // Reset input fields after successful post creation
            setPoints(['', '', '']);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-md mx-auto my-4 border border-gray-200">
            <div className="write bg-white border border-gray-200 p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                        What's on your mind?
                    </h3>
                </div>

                {points.map((point, index) => (
                    <div key={index} className="mb-3">
                        <input 
                            type="text" 
                            value={point}
                            onChange={(e) => handlePointChange(index, e.target.value)}
                            placeholder={`Point ${index + 1}`} 
                            className="w-full p-3 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>
                ))}

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <button 
                    onClick={handleSubmit}
                    disabled={!areAllPointsFilled || !token || loading}
                    className="w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Posting...' : (token ? 'Post' : 'Login to Post')}
                </button>
            </div>
        </div>
    );
};

export default CreatePost;
