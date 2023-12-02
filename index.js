// external imports
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// internal imports
const userHandler = require('./routeHandlers/userHandler');
const conversationHandler = require('./routeHandlers/conversationHandler');
const messageHandler = require('./routeHandlers/messageHandler');

const app = express();

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
app.use('/conversation', conversationHandler);
app.use('/message', messageHandler);

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port: ${process.env.PORT}`);
});
