// external dependencies
const admin = require('firebase-admin');
const bcrypt = require('bcrypt');

// internal dependencies
const User = require('../models/User');

async function createUser(req, res) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		// Handle the error
		console.log('No token provided');
		return;
	}

	// Get an instance of the Auth client
	const auth = admin.auth();

	auth.verifyIdToken(token)
		.then((decodedToken) => {
			const { name, picture, email, email_verified, uid } = decodedToken;

			auth.setCustomUserClaims(uid, { role: 'student' }).then((res) =>
				auth
					.getUser(uid)
					.then((user) => {
						console.log(uid);
						console.log(user);
					})
					.catch((err) => console.log(err))
			);
		})
		.catch((err) => {
			console.log(err);
		});
}

async function removeUser(req, res) {
	const id = req.params.id;
	const result = await User.findByIdAndDelete(id);

	res.send(result);
}

module.exports = { createUser, removeUser };
