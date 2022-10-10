const Post = require('../models/post');
const Comment = require('../models/comment');

exports.create_comment = (req, res, next) => {
    const comment = new Comment({
        body: req.body.body,
        date: new Date()
    });

    comment.save((err) => {
        if (err) return next(err);

        Post.findByIdAndUpdate(req.params.id, {$push: {comment: comment}}, {}, (err, data) => {
            if (err) return next(err);

            res.json(data);
        })
    })
}