const jwt = require('jsonwebtoken');

async function verifyAuthToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	// send unauthorized status
	if (!token) return res.sendStatus(403);

	// verify the token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		// if error occur
		if (err) return res.sendStatus(403);

		// after successful verification
		req.user = user;
	});
}

module.exports = verifyAuthToken;
