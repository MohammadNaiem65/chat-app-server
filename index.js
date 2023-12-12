// external imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// internal imports
const userHandler = require('./routeHandlers/userHandler');
const loginHandler = require('./routeHandlers/loginHandler');
const conversationHandler = require('./routeHandlers/conversationHandler');
const messageHandler = require('./routeHandlers/messageHandler');

// TODO: import firebase credentials
const firebaseCredentials = require('./firebase-credentials.json');

admin.initializeApp({
	credential: admin.credential.cert(firebaseCredentials),
});

const app = express();
app.use(cors());

// connect to server
mongoose
	.connect(process.env.MONGO_CONNECTION_STRING)
	.then(() => {
		console.log('Connected to database');
	})
	.catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/user', userHandler);
app.use('/login', loginHandler);
app.use('/conversation', conversationHandler);
app.use('/message', messageHandler);

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port: ${process.env.PORT}`);
});
