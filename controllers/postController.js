const Post = require('../models/post');
const Comment = require("../models/comment");

// post routes
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
    Post.findById(req.params.postid)
        .populate('comments')
        .exec((err, post) => {
            if (err) return next(err);

            res.json(post);
    })
};

exports.delete_post = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postid);

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
        const removedPost = await Post.findByIdAndRemove(req.params.postid);

        res.json(removedPost);
    } catch (err) {
        if (err) return next(err);
    }
};

// comment routes
exports.comments_list = (req, res, next) => {
    Post.findById(req.params.postid)
        .populate('comments')
        .exec((err, post) => {
        if (err) return next(err);

        res.json(post.comments);
    })
}

exports.create_comment = (req, res, next) => {
    const comment = new Comment({
        body: req.body.body,
        date: new Date()
    });

    comment.save((err, comment) => {
        if (err) return next(err);

        Post.findByIdAndUpdate(req.params.postid, {$push: {comments: comment}}, {}, (err) => {
            if (err) return next(err);

            res.json(comment);
        })
    });
};

exports.delete_comment = async (req, res, next) => {
    try {
        await Post.findOneAndUpdate(req.params.postid, {$pull: {comments: req.params.commentid}});
    } catch (err) {
        if (err) return next(err);
    }

    try {
        const comment = await Comment.findByIdAndRemove(req.params.commentid);
        res.json(comment);
    } catch (e) {
        if (e) return next(e);
    }
}