import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import { Zap, BookOpen, Save } from 'lucide-react';

const ArticleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  if (!location.state) { navigate('/'); return null; }

  const { article } = location.state;
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setIsSummarizing(true);
    setError('');
    const textToSummarize = `${article.title}\n\n${article.description || ''}\n\n${article.content || ''}`;
    try {
      const { data } = await API.post('/summarize', { text: textToSummarize });
      setSummary(data.summary);
    } catch (err) {
      setError('Could not generate summary.');
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSave = async () => {
    if (!summary) return;
    setIsSaving(true);
    try {
      await API.post('/user/saved', {
        articleId: article.url,
        title: article.title,
        source: article.source.name,
        summary: summary,
      });
      alert('Summary saved to "My Summaries"!');
    } catch (error) {
      alert('Login is required to save summaries.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">{article.title}</h1>
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span>By {article.author || article.source.name}</span>
        <span>{formattedDate}</span>
      </div>
      <img src={article.urlToImage} alt={article.title} className="w-full rounded-lg mb-6 shadow-md" />
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
        {article.description || 'No description available.'}
      </p>
      
      <div className="flex flex-col md:flex-row gap-4 items-center border-t dark:border-gray-700 pt-6">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg text-center hover:bg-blue-700 transition-colors">
          <BookOpen size={20} className="mr-2" />
          Read Full Article
        </a>
        <button
          onClick={handleSummarize}
          disabled={isSummarizing}
          className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-green-400 transition-colors"
        >
          {isSummarizing ? <Spinner /> : <Zap size={20} className="mr-2" />}
          {isSummarizing ? 'Generating...' : 'Summarise'}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      
      {summary && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">AI Summary</h3>
            {isAuthenticated && (
              <button onClick={handleSave} disabled={isSaving} className="flex items-center px-4 py-2 bg-indigo-500 text-white text-sm rounded-lg hover:bg-indigo-600 disabled:bg-indigo-300">
                {isSaving ? 'Saving...' : <><Save size={16} className="mr-2"/> Save Summary</>}
              </button>
            )}
          </div>
          <div className="prose prose-blue dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: summary.replace(/\* /g, '• ').replace(/\n/g, '<br />') }}></div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetail;