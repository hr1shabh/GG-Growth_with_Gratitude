import React from 'react';
import { useAuth } from '../../context/authContext';
const CreatePost = () => {
    const { currentUser } = useAuth();
    return (
        <div className="space-y-4 p-4 max-w-2xl mx-auto">
        <div className="write flex items-center space-x-4 bg-white border border-gray-200 p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
            <input 
                type="text" 
                placeholder="What's on your mind?" 
                className="flex-grow p-3 text-lg text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-14"
            />
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Post
            </button>
        </div>
    </div>
    )
}

export default CreatePost;