const express = require('express');
const { getSearchSuggestions } = require('../controller/search');
const router = express.Router();

router.get('/search', getSearchSuggestions);

module.exports = router;
