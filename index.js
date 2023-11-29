const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// connect to server
mongoose
	.connect(process.env.MONGO_CONNECTION_STRING)
	.then(() => {
		console.log('Connected to server');
	})
	.catch((err) => console.log(err));

app.get('/', (req, res) => {
	console.log('working');
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port: ${process.env.PORT}`);
});
