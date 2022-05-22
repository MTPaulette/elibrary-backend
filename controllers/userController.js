const User = require("../models/index").User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportjS = require('../config/passport').passport;
const key = require("../models/index").key;

const { Op } = require("sequelize");


//find all user from the database
exports.findAll = (req, res) => {

};

//find a single user with an id
exports.findOne = (req, res) => {
    
};


//update user by the id in the request
exports.update = (req, res) => {

};

//delete user with specific id
exports.delete = (req, res) => {

};

//delete all the user
exports.deleteAll = (req, res) => {

};

//find all published users
exports.findAllPublished = (req, res) => {

};

//create and save a new user during user registration
exports.create = async (req, res) => {
    
    let { login, email,password, confirm_password } = req.body

    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match."
        });
    }
    
    //check for the unique login
    const userWithLogin = await User.findOne ({
        where: {
            login: login
        }
    })//.then(user => {
    if(userWithLogin) {
        return res.status(400).json({
            msg: "this login is already taken",
            user: userWithLogin
        });
    }
    //});

    //check for the unique email
    const userWithEmail = await User.findOne ({
        where: {
            email: email
        }
    })
    if(userWithEmail) {
        return res.status(400).json({
            msg: "this email is already registred. Did you forgot your password?",
            user: userWithEmail
        });
    }

    //the data is valid and now we can register the user
    let newUser = new User({
        login,
        email,
        password
    });
    
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw errow;
            newUser.password = hash;
            newUser.save().then(user => {
                return res.status(201).json({
                    success: true,
                    msg: "user registred successfully",
                    user: user
                });
            });
        });
    });
};

//user login
exports.login = async (req, res) => {

    let { login, email,password } = req.body;
    const user = await User.findOne ({
        where: {
            email: email
        }
    })

    if(!user) {
        return res.status(404).json({
            msg: "Email pas trouvé",
            success: false
        });
    }
        
    
    //if there is user we are now going to compare the password
    bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
            const jwt_payload = {
                _id: user.id,
                login: user.login,
                email: user.email,
                password: user.password
            }
            jwt.sign(jwt_payload, key, {
                expiresIn: 604800
            },(err, token) => {
                return res.status(200).json({
                    success: true,
                    token: 'Bearer '+ token,
                    msg: "Bingo!!! vous êtes connectés"
                });
            })
        }else {
            return res.status(404).json({
                msg: "mot de passe incorrect",
            });
        }
    });


/*
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Model = require('../../models/index');
const User = Model.User;
const key = Model.key;

/*
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

console.log(jwt_payload);
    const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload._id).then(user => {
                if(user) return done(null, user);
                return done(null, false);
            }).catch(err => {
                console.log(err)
            });
        })
    
passport.use(strategy);
*/
};
