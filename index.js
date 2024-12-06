const http = require('http');
const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const app = express();

const httpServer = http.createServer(app);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODBURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// Middleware
app.use(express.json());

// Listen the post
httpServer.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
