const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {

        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({username})
            .then(user => {
                if (!user) return cb(null, false, {message: 'Incorrect username.'});

                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        return cb(null, user, {message: 'Logged In Successfully'});
                    } else {
                        return cb(null, false, { message: "Incorrect password" });
                    }
                })
            }).catch(
                err => cb(err)
            );
    }
));