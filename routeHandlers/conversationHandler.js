const express = require('express');
const verifyAuthToken = require('../middlewares/common/verifyAuthToken');

const router = express.Router();

router.get('/', verifyAuthToken, (req, res) => {
	res.json({ message: 'From conversation' });
});

module.exports = router;
