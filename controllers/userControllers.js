// external dependencies
const bcrypt = require('bcrypt');

// internal dependencies
const User = require('../models/User');

async function createUser(req, res) {
	const user = req.body;
	const hashedPassword = await bcrypt.hash(user.password, 10);
	user.password = hashedPassword;

	const newUser = new User(user);
	const result = await newUser.save();
	res.send(result);
}

module.exports = { createUser };
