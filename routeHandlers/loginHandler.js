// internal imports
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// external imports
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({
		$or: [{ email: username }, { mobile: username }],
	});

	if (user?._id) {
		const isValidPassword = await bcrypt.compare(password, user.password);

		if (isValidPassword) {
			// create user object to generate jwt token
			const userObject = {
				name: user.name,
				_id: user._id,
				role: user.role,
			};

			// generate jwt token
			const jwtToken = jwt.sign(userObject, process.env.JWT_SECRET, {
				expiresIn: '1d',
			});

			res.cookie('user-details', jwtToken, {
				maxAge: 86400000,
				httpOnly: true,
				signed: true,
			});
		} else {
		}
	} else {
		res.status;
	}
});

module.exports = router;
