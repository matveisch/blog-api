const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {type: String, required: true},
    date: {type: Date}
});

module.exports = mongoose.model('Comment', commentSchema);