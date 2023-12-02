// external dependencies
const express = require('express');

// internal dependencies
const { createUser } = require('../controllers/userControllers');

const router = express.Router();

router.post('/', createUser);

module.exports = router;
