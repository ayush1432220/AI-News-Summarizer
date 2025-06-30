import React, { useState, useEffect, useCallback } from 'react';
import API from '../api'; 
import NewsCard from '../components/NewsCards';
import Spinner from '../components/Spinner';

const CATEGORIES = ['general', 'business', 'technology', 'health', 'sports', 'science'];

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('general');

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.get(`/news?category=${activeCategory}`);
      setArticles(response.data.articles);
    } catch (err) {
      setError("Failed to fetch news. Please check your network or API key.");
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => { fetchNews(); }, [fetchNews]);

  return (
    <div>
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-4">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors duration-200 whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600' // Inactive tab style
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? <div className="flex justify-center mt-16"><Spinner /></div> : error ? <p className="text-center text-red-500">{error}</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map(article => <NewsCard key={article.url} article={article} />)}
        </div>
      )}
    </div>
  );
};

export default Home;