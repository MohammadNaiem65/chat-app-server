// external dependencies
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

// internal dependencies
const User = require('../models/User');

// create a new user
async function createUser(req, res) {
	const authHeader = req.headers.authorization;
	const idToken = authHeader && authHeader.split(' ')[1];

	if (!idToken) {
		// Handle the error
		res.status(403);
		return;
	}

	// Get an instance of the Auth client
	const auth = admin.auth();

	// verify token
	try {
		const decodedToken = await auth.verifyIdToken(idToken);
		const { name, picture, email, email_verified, uid } = decodedToken;

		// * generate access token
		const accessToken = jwt.sign(
			{ email, role: 'student' },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: '1h',
			}
		);

		// * generate refresh token
		const refreshToken = jwt.sign(
			{ email, role: 'student' },
			process.env.REFRESH_TOKEN_SECRET,
			{
				expiresIn: '1d',
			}
		);

		// * save user to database
		await User.init();
		const newUser = await User.create({
			name,
			email,
			email_verified,
			avatar: picture,
			role: 'student',
			refreshToken,
		});

		// save role and _id to firebase account
		await auth.setCustomUserClaims(uid, {
			role: 'student',
			_id: newUser._id,
		});

		// * send refresh token securely along with access token
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			signed: true,
		});
		res.json({
			msg: 'Login successful!',
			accessToken,
		});
	} catch (error) {
		if (error?.MongoServerError) {
			console.log(error?.key);
		}
	}
}

async function removeUser(req, res) {
	const id = req.params.id;
	const result = await User.findByIdAndDelete(id);

	res.send(result);
}

module.exports = { createUser, removeUser };
