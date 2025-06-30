const axios = require('axios');

exports.getNews = async (req, res) => {
  const { category = 'general', q = '' } = req.query;
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?category=${category}&q=${q}&apiKey=${process.env.NEWS_API_KEY}`;
  
  try {
    const response = await axios.get(NEWS_API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};