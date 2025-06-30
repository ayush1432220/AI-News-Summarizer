const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { saveSummary, getUserSavedArticles } = require('../controllers/user.controller');

router.post('/saved', authMiddleware, saveSummary);
router.get('/saved', authMiddleware, getUserSavedArticles);

module.exports = router;