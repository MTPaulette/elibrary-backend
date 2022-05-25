const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Model = require('../models/index');
const passport = require('passport');
const { user } = require('../config/connectionDB');

const User = Model.User;
const Admin = Model.Admin;
const key = Model.key;


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    await User.findByPk(jwt_payload._id).then(user => {

        if (user) {
            const userResult = {
                instance: user,
                payload: jwt_payload,
                role: 'utilisateur'
            }
            return done(null, userResult); 
        } else {
            Admin.findByPk(jwt_payload._id).then(admin => {
                const adminResult = {
                    instance: admin,
                    role: 'admin'
                }
                if (admin) {
                    return done(null, adminResult);
                }
                return done(null, false);
            }).catch(err => {
                console.log(err)
            });
           
        }
    }).catch(err => {
        console.log(err)
    });
})

const strategyPassport = passport.use(strategy);
module.exports = strategyPassport;

/*
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    await User.findByPk(jwt_payload._id).then(user => {
        if(user) return done(null, user);
        return done(null, false);
    }).catch(err => {
        console.log(err)
    });
})
*/

/*


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    await User.findByPk(jwt_payload._id).then(user => {


        if (user) {
            return done(null, user);
        } else {
            Admin.findByPk(jwt_payload._id).then(admin => {
                if (admin) {
                    return done(null, admin, 'admin');
                }
                return done(null, false);
            }).catch(err => {
                console.log(err)
            });
           
        }
    }).catch(err => {
        console.log(err)
    });
})
*/