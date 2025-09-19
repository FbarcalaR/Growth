import React from 'react';
import { useUser } from '../../../lib/hooks';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useUser();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Growth</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {isAuthenticated && (
              <>
                <a href="/dashboard" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </a>
                <a href="/routines" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Routines
                </a>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-800">
                  Welcome, {user?.firstName}
                </span>
                <button
                  onClick={logout}
                  className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <a href="/login" className="text-gray-800 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </a>
                <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 