const mongoose = require('mongoose');

const SavedArticleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  articleId: { type: String, required: true }, // Can be the article URL
  title: { type: String, required: true },
  source: { type: String },
  summary: { type: String, required: true },
  savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedArticle', SavedArticleSchema);