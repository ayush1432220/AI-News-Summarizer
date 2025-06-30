import React, { useState, useEffect } from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const MySummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const fetchSummaries = async () => {
      try {
        const { data } = await API.get('/user/saved');
        setSummaries(data);
      } catch (error) {
        console.error("Could not fetch summaries");
      } finally {
        setLoading(false);
      }
    };
    fetchSummaries();
  }, [isAuthenticated, navigate]);

  if (loading) return <Spinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Saved Summaries</h1>
      {summaries.length === 0 ? <p>No summaries saved yet.</p> : (
        <div className="space-y-6">
          {summaries.map(item => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.summary}</p>
              <a href={item.articleId} target="_blank" rel="noreferrer">Read Original</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySummaries;