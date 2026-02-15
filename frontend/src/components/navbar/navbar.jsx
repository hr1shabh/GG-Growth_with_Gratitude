import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { Menu, Search, X, Flame } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Responsive text size */}
          <div className="flex-shrink-0">
            <Link to="/" className="group">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-blue-600 transition-all duration-300">
                GG
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center px-8">
            <div className="relative w-full max-w-xl">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isSearchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm transition-all bg-gray-50 hover:bg-white"
              />
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                {/* Streak Display */}
                <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100" title="Daily Streak">
                  <Flame
                    className={`h-5 w-5 ${currentUser.streak > 0 ? 'text-orange-500 fill-orange-500' : 'text-gray-400'}`}
                  />
                  <span className={`font-bold ${currentUser.streak > 0 ? 'text-gray-800' : 'text-gray-400'}`}>
                    {currentUser.streak || 0}
                  </span>
                </div>

                <Link to={`/profile/${currentUser.id}`}>
                  <div className="relative group">
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full font-bold text-lg cursor-pointer transform hover:scale-105 transition-all duration-200">
                      {currentUser.email.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 text-sm"
              />
            </div>
            {currentUser ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-full font-bold text-sm">
                    {currentUser.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-600">{currentUser.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="block">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all shadow-sm hover:shadow-md">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;