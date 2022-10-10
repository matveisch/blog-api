const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: true, maxLength: 100},
    body: {type: String, required: true},
    date: {type: Date},
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('Post', postSchema);
