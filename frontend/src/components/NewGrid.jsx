import React from 'react';
import NewsCard from './NewsCard';
import ErrorMessage from './ErrorMessage';

const NewsGrid = ({ articles, onSummarize }) => {
  if (!articles || articles.length === 0) {
    return <ErrorMessage message="No articles found for this category." />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} onSummarize={onSummarize} />
      ))}
    </div>
  );
};

export default NewsGrid;