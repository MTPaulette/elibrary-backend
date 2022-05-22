const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Model = require('../models/index');
const passport = require('passport');

const User = Model.User;
const key = Model.key;


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

const strategyPassport = passport.use(strategy);
module.exports = strategyPassport;

