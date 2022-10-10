const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const postsRouter = require('./routes/posts');

const app = express();

app.use(express.json());

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.json('app');
})

app.use('/posts', postsRouter);

app.listen(4000, () => {
    console.log('app is running');
})