const express = require('express');
const router = express.Router();
const { getUsersWithLinks } = require('../controllers/authController');

router.get('/users', getUsersWithLinks);

module.exports = router;
