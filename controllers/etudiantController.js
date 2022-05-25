const Etudiant = require("../models/index").Etudiant;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require("../models/index").key;

const { Op } = require("sequelize");


//find all etudiant from the database
exports.findAll = (req, res) => {

};

//find a single etudiant with an id
exports.findOne = (req, res) => {
    
};


//update etudiant by the id in the request
exports.update = (req, res) => {

};

//delete etudiant with specific id
exports.delete = (req, res) => {

};

//delete all the etudiant
exports.deleteAll = (req, res) => {

};

//find all published etudiants
exports.findAllPublished = (req, res) => {

};

//create and save a new etudiant during etudiant registration
exports.create = async (req, res) => {
    
    let { login, email,password, confirm_password, faculte, filiere, niveau, specialite } = req.body

    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match."
        });
    }
    
    //check for the unique login
    const etudiantWithLogin = await Etudiant.findOne ({
        where: {
            login: login
        }
    })//.then(etudiant => {
    if(etudiantWithLogin) {
        return res.status(400).json({
            msg: "this login is already taken",
            etudiant: etudiantWithLogin
        });
    }
    //});

    //check for the unique email
    const etudiantWithEmail = await Etudiant.findOne ({
        where: {
            email: email
        }
    })
    if(etudiantWithEmail) {
        return res.status(400).json({
            msg: "this email is already registred. Did you forgot your password?",
            etudiant: etudiantWithEmail
        });
    }

    //the data is valid and now we can register the etudiant
    let newEtudiant = new Etudiant({
        login,
        email,
        password,
        faculte,
        filiere,
        niveau,
        specialite 
    });
    
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newEtudiant.password, salt, (err, hash) => {
            if(err) throw errow;
            newEtudiant.password = hash;
            newEtudiant.save().then(etudiant => {
                return res.status(201).json({
                    success: true,
                    msg: "etudiant registred successfully",
                    etudiant: etudiant
                });
            });
        });
    });
};

//etudiant login
exports.login = async (req, res, next) => {

    let { login, email,password } = req.body;
    const etudiant = await Etudiant.findOne ({
        where: {
            email: email
        }
    })

    if(!etudiant) {
        return res.status(204).json({
            msg: "Email pas trouvé",
            success: false,
            email: false,
            password: false
        });
    }
    
    //if there is etudiant we are now going to compare the password
    bcrypt.compare(password, etudiant.password).then(isMatch => {
        if(isMatch) {
            const jwt_payload = {
                _id: etudiant.id,
                login: etudiant.login,
                email: etudiant.email,
                password: etudiant.password
            }
            jwt.sign(jwt_payload, key, {
                expiresIn: 604800
            },(err, token) => {
                return res.status(200).json({
                    success: true,
                    token: 'Bearer '+ token,
                    etudiant: etudiant,
                    msg: "Bingo!!! vous êtes connectés",
                    password: true,
                    email: true
                });
            })
        }else {
            return res.status(204).json({
                msg: "mot de passe incorrect",
                success: false,
                password: false
            });
        }
    });


/*
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Model = require('../../models/index');
const Etudiant = Model.Etudiant;
const key = Model.key;

/*
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key;

console.log(jwt_payload);
    const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
            Etudiant.findById(jwt_payload._id).then(etudiant => {
                if(etudiant) return done(null, etudiant);
                return done(null, false);
            }).catch(err => {
                console.log(err)
            });
        })
    
passport.use(strategy);
*/
};
