import React from 'react';
import { NavLink } from 'react-router-dom';
import { Newspaper } from 'lucide-react';

const Header = () => {
  const activeLinkStyle = {
    color: '#3b82f6', 
    borderBottom: '2px solid #3b82f6',
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Newspaper className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl md:text-2xl font-bold">AI News Dashboard</h1>
        </div>
        <nav className="flex items-center space-x-6 text-lg">
          <NavLink 
            to="/" 
            className="pb-1 transition-colors hover:text-blue-500"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            Home
          </NavLink>
          <NavLink 
            to="/summaries" 
            className="pb-1 transition-colors hover:text-blue-500"
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
          >
            My Summaries
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;