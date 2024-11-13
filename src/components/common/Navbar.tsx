import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Package } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900"
            >
              <Package className="h-6 w-6 mr-2" />
              <span className="font-semibold text-xl">Catalog Manager</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              to="/create-catalog"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Catalog
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 flex items-center text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5 mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}