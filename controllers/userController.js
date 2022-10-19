const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/user');

exports.create_user = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
        if (err) return next(err);

        const user = new User({
            username: req.body.username,
            password: hashedPass
        });

        user.save(error => {
            if (error) return next(error);

            res.json(user);
        });
    })
};

exports.log_in = function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) res.send(err);

            // generate a signed son web token with the contents of user object and return it in the response

            const token = jwt.sign({user}, 'your_jwt_secret');
            return res.json({user, token});
        });
    })(req, res);
};