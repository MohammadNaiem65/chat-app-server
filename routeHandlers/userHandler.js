// external dependencies
const express = require('express');

// internal dependencies
const { createUser, removeUser } = require('../controllers/userControllers');

const router = express.Router();

router.post('/', createUser);
router.delete('/:id', removeUser);

module.exports = router;
