import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
const CreatePost = () => {
    const [points, setPoints] = useState(['', '', '']);

    // Update a specific point by index
    const handlePointChange = (index, value) => {
      const newPoints = [...points];
      newPoints[index] = value;
      setPoints(newPoints);
    };
  
    // Check if all points are filled
    const areAllPointsFilled = points.every(point => point.trim() !== '');
  
    // Handle post submission
    const handleSubmit = () => {
      if (areAllPointsFilled) {
        // onPostSubmit(points);
        // Reset points after submission if needed
        setPoints(['', '', '']);
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
          
          <button 
            onClick={handleSubmit}
            disabled={!areAllPointsFilled}
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {areAllPointsFilled ? 'Post' : 'Fill All Points to Post'}
          </button>
        </div>
      </div>
    );
  };

export default CreatePost;