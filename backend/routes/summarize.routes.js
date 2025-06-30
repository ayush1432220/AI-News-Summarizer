const express = require('express');
const router = express.Router();
const { summarizeArticle } = require('../controllers/summarize.controller');

router.post('/', summarizeArticle);

module.exports = router;