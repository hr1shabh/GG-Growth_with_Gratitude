import React from 'react';


const RightBar = () => {
    const imagee = "data:image/jpeg;base64,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"

  return (
    <div className="w-72 bg-white shadow-md h-screen sticky top-0 overflow-y-auto right-0 p-4">
      <div className="space-y-6">
        {/* Suggestions For You Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-lg font-semibold text-gray-800 block mb-4">
            Suggestions For You
          </span>
          
          {/* User Suggestion 1 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img 
                src={imagee} 
                alt="profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">
                Follow
              </button>
              <button className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-300 transition-colors">
                Remove
              </button>
            </div>
          </div>
          
          {/* User Suggestion 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src={imagee} 
                alt="profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">
                Follow
              </button>
              <button className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full hover:bg-gray-300 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Online Friends Section */}
        <div className="bg-gray-50 rounded-lg p-4">
          <span className="text-lg font-semibold text-gray-800 block mb-4">
            Online Friends
          </span>
          
          {/* Online Friend 1 */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative">
              <img 
                src={imagee} 
                alt="profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
              {/* Green online dot */}
              <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <span className="text-sm font-medium text-gray-700">John Doe</span>
          </div>
          
          {/* Online Friend 2 */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={imagee} 
                alt="profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
              {/* Green online dot */}
              <span className="absolute bottom-0 right-0 block w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <span className="text-sm font-medium text-gray-700">John Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;