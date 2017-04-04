const mongoose = require("mongoose");
const User = mongoose.model("User");
const Business = mongoose.model("Business");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');


/* Post Function, to register a new user into the users database
   Calling Route: /api/register/   */
module.exports.registerUser = function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;
    var birthDate = req.body.birthDate;

    //Validating entries
    req.checkBody('firstName', 'First Name is required.').notEmpty();
    req.checkBody('lastName', 'Last Name is required.').notEmpty();
    req.checkBody('email', 'Email is required.').notEmpty();
    req.checkBody('email', 'Email format is not correct.').isEmail();
    req.checkBody('username', 'Username is required.').notEmpty();
    req.checkBody('password', 'Password is required.').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match.').equals(password);

    var errors = req.validationErrors();

    if (errors) {
        //TODO in front end
        //res.render('register', {errors: errors});
        res.json({
            errors: errors
        });
    } else {
        User.find({
            $or: [{
                'username': username
            }, {
                'email': email
            }]
        }, function (err, user) {
            //if there is an error, send an error message
            if (err) {
                //TODO Error handling
                res.json('Signup error');
                return done(err);
            }

            //if username or email already exist
            if (user.length != 0) {
                if (user[0].username == username)
                    return res.json('Username already exists, username: ' + username + '. Please enter another username.');
                else
                    return res.json('Email already exists, email: ' + email + '. Please enter another email.');
            }
            //Username and email are unique, create the user and save it in the database.
            else {
                var newUser = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: username,
                    password: password,
                    birthDate: birthDate
                });

                User.createUser(newUser, function (err, user) {
                    if (err) res.json('Sign up Error');
                    else res.json(newUser);
                });
            }
        });
    }
}


//Middleware function for Passport module for authentication
module.exports.passportAuthenticate = passport.authenticate('local');


/* Function to login a user
   Calling Route: /api/login/   */
module.exports.login = function (req, res) {
    //Setting the Session Variable loggedin to the username in order to get the logged in user for later usage.
    req.session.loggedin = req.body.username;
    res.json('You are logged in as ' + req.session.loggedin);;
};


/* Get Function, to logout a user
   Calling Route: /api/logout/   */
module.exports.logout = function (req, res) {
    req.logout();
    res.json('You have successfully logged out.');
}


// Passport handling the login
passport.use(new LocalStrategy(
    function (username, password, done) { // Finding the user by his username
        User.getUserByUsername(username, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: 'Invalid Username.'
                });
            }
            //Comparing to see if the 2 passwords match
            User.comparePassword(password, user.password, function (err, isMatch) {
                if (err) throw err;
                if (isMatch)
                    return done(null, user);
                else
                    return done(null, false, {
                        message: 'Invalid password.'
                    });
            });
        });
    }));


//Passport module serializes User ID
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


//Passport module deserializes User ID
passport.deserializeUser(function (id, done) {
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});


/*Delete function, to delete a user account by getting his username from the session used when he logged in,
 and then removing his entry from the db
 Calling Route: /api/deleteAccount */
module.exports.deleteAccount = function (req, res) {
    var query = {
        username: req.session.loggedin
    };
    User.remove(query, function (err) {
        if (err)
            res.json(err);
        else res.json("Account was deleted successfully.");
    });
}


/*Add business id to the favorites array in user model,
and return success message if business added successfuly,
else returns error message.
Calling route: 'api/user/:userId/addfavorite/:businessId'
*/
module.exports.addFavorite = function(req, res) {
    // if the user is logged in
    if (req.user) {
        var businessId = req.params.businessId; //to get the id of the busniness i want to add to favorites
        var userId = req.params.userId; //using passport, get the id of the signed in user
        User.update({
                "_id": userId
            }, {
                $addToSet: {
                    favorites: businessId
                }
            }, //add the business id to the favorites array
            function(err, result) {
                //couldn't add to array, return the error
                if (err) {
                    res.json({
                        success: false,
                        msg: 'adding business to favorites failed'
                    });
                } else {
                    res.json({
                        success: true,
                        msg: 'business added to favorites'
                    });
                }
            });
    }
    // //if the user is not logged in:
    else {
        res.send("you should sign in first.")
        //res.redirect('/register');
    }
};


/*Search he Business model for businesses with name or tag
entered by the user, it gets all businesses with matching names
and tags and returns them to the frontend
Calling route: "/api/search" */
module.exports.searchByNameOrTag = function(req, res) {
    //Check for query string Ex: "/api/search?result=omar"
    if (req.query && req.query.result) {
        var nameOrTag = req.query.result;

        //Find businesses from the database
        Business.find({
                $or: [{
                        name: {
                            //Starts with or is the nameOrTag
                            $regex: "^" + nameOrTag,
                            //Ignore whitespace characters and case insensitive
                            $options: "ix"
                        }
                    },
                    {
                        tags: {
                            $regex: "^" + nameOrTag,
                            $options: "ix"
                        }
                    }
                ]
            },
            function(err, businesses) {
                //If an error occured return it to the frontend
                if (err) {
                    res.json(err);
                } else {
                    //return an array of businesses or an empty array
                    res.json(businesses);
                }
            }
        );
    } else
        //return an empty array
        res.json([]);
};
