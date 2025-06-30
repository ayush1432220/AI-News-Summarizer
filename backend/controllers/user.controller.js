const SavedArticle = require('../models/savedArticle.model');

exports.saveSummary = async (req, res) => {
  const { articleId, title, source, summary } = req.body;
  try {
    const newSavedArticle = new SavedArticle({
      userId: req.user.id,
      articleId,
      title,
      source,
      summary
    });
    const saved = await newSavedArticle.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserSavedArticles = async (req, res) => {
  try {
    const articles = await SavedArticle.find({ userId: req.user.id }).sort({ savedAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};