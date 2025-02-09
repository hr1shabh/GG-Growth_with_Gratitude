import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth(); // Get currentUser and logout function from AuthContext

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm w-full border-b border-gray-100">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <Link to="/" className="no-underline">
          <span className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
            GG - Growth with Gratitude
          </span>
        </Link>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-grow mx-8 max-w-xl">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm transition-all shadow-sm hover:shadow-md"
        />
      </div>

      {/* Right Section: User Avatar and Logout */}
      <div className="flex items-center space-x-4">
        {currentUser ? (
          <>
            {/* Circular Avatar */}
            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full font-bold text-lg">
              {currentUser.email.charAt(0).toUpperCase()}
            </div>

            {/* Logout Button - Softer UI */}
            <button
              onClick={logout}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-all shadow-sm hover:shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
