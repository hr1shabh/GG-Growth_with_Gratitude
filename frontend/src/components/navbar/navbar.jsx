import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md w-full">
      <div className="flex items-center">
        <Link to="/" className="no-underline">
          <span className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
            GG - Growth with Gratitude
          </span>
        </Link>
      </div>
      
      <div className="flex-grow mx-8 max-w-md">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <Link to="/login">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;