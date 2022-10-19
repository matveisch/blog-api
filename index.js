const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const postsRouter = require('./routes/posts');
const userRouter = require('./routes/userRoutes');
require('./passport');

const app = express();

app.use(express.json());
app.use(cors());

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.json('app');
})

app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(4000, () => {
    console.log('app is running');
})