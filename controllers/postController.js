const Post = require('../models/post');
const Comment = require("../models/comment");

exports.posts_list = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        return next(err);
    }
};

exports.create_post = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        date: new Date(),
    })

    post.save((err, post) => {
        if (err) return next(err);
        res.json(post);
    })
};

exports.get_post = (req, res, next) => {
    Post.findById(req.params.id)
        .populate('comments')
        .exec((err, post) => {
            if (err) return next(err);

            res.json(post);
    })
};

exports.delete_post = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        for (const comment of post.comments) {
            try {
                await Comment.findByIdAndRemove(comment._id);
            } catch (err) {
                if (err) return next(err);
            }
        }
    } catch (err) {
        if (err) return next(err);
    }

    try {
        const removedPost = await Post.findByIdAndRemove(req.params.id);

        res.json(removedPost);
    } catch (err) {
        if (err) return next(err);
    }
};

exports.comments_list = (req, res, next) => {
    Post.findById(req.body.id)
        .populate('comments')
        .exec((err, user) => {
        if (err) return next(err);

        res.json(user.comments);
    })
}

exports.create_comment = (req, res, next) => {
    const comment = new Comment({
        body: req.body.body,
        date: new Date()
    });

    comment.save((err, comment) => {
        if (err) return next(err);

        Post.findByIdAndUpdate(req.body.id, {$push: {comments: comment}}, {}, (err) => {
            if (err) return next(err);

            res.json(comment);
        })
    });
};