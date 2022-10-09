const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('app');
})

app.listen(4000, () => {
    console.log('app is running');
})