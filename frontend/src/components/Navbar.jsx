import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Newspaper } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <Newspaper className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold">AI News</h1>
        </NavLink>
        <nav className="flex items-center space-x-4">
          <NavLink to="/">Home</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/summaries">My Summaries</NavLink>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup" className="bg-blue-500 text-white px-3 py-1 rounded">Signup</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;