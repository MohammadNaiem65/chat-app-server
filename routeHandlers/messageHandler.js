const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.json({ message: 'From Message' });
});

module.exports = router;
