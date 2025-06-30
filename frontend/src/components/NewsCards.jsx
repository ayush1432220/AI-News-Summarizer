import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ article }) => {
  const defaultImage = "https://via.placeholder.com/600x400.png?text=News";

  return (
    <Link 
      to="/article" 
      state={{ article: article }} 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col transform hover:scale-105 hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative">
        <img 
            src={article.urlToImage || defaultImage} 
            alt={article.title} 
            className="w-full h-40 object-cover" 
            onError={(e) => { e.target.onerror = null; e.target.src=defaultImage; }}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {article.source.name}
        </p>
        <h3 className="text-md font-semibold flex-grow text-gray-900 dark:text-white">
          {article.title}
        </h3>
      </div>
    </Link>
  );
};

export default NewsCard;