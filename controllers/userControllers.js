// external dependencies
const bcrypt = require('bcrypt');

// internal dependencies
const User = require('../models/User');

async function createUser(req, res) {
	const user = req.body;
	const hashedPassword = await bcrypt.hash(user.password, 10);
	user.password = hashedPassword;

	const newUser = new User(user);
	try {
		const result = await newUser.save();
		res.send(result);
	} catch (err) {
		res.status(500).json({
			errors: {
				common: {
					msg: 'Unknown error occurred',
				},
			},
		});
	}
}

async function removeUser(req, res) {
	const id = req.params.id;
	const result = await User.findByIdAndDelete(id);

	res.send(result);
}

module.exports = { createUser, removeUser };
