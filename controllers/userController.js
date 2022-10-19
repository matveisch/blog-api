const User = require('../models/user');
const bcrypt = require('bcrypt');

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
}

exports.log_in = async (req, res, next) => {
    try {
        let {username, password} = req.body;

        const user = await User.findOne({'username': username});
    } catch (e) {
        if (e) return next(e);
    }
};