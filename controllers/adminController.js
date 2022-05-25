const Admin = require("../models/index").Admin;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require("../models/index").key;

const { Op } = require("sequelize");
const Enseignant = require("../models").Enseignant;


//find all admin from the database
exports.findAll = (req, res) => {

};

//find a single admin with an id
exports.findOne = (req, res) => {
    
};


//update admin by the id in the request
exports.update = (req, res) => {

};

//delete admin with specific id
exports.delete = (req, res) => {

};

//delete all the admin
exports.deleteAll = (req, res) => {

};

//find all published admins
exports.findAllPublished = (req, res) => {

};

//create and save a new admin during admin registration
exports.create = async (req, res) => {
    
    let { email,password, confirm_password } = req.body

    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match."
        });
    }

    //check for the unique email
    const adminWithEmail = await Admin.findOne ({
        where: {
            email: email
        }
    })
    if(adminWithEmail) {
        return res.status(400).json({
            msg: "this email is already registred. Did you forgot your password?",
            admin: adminWithEmail
        });
    }

    //the data is valid and now we can register the admin
    let newAdmin = new Admin({
        email,
        password
    });
    
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if(err) throw errow;
            newAdmin.password = hash;
            newAdmin.save().then(admin => {
                return res.status(201).json({
                    success: true,
                    msg: "admin registred successfully",
                    admin: admin
                });
            });
        });
    });
};

//admin login
exports.login = async (req, res, next) => {

    let { email,password } = req.body;
    const admin = await Admin.findOne ({
        where: {
            email: email
        }
    })

    if(!admin) {
        return res.status(204).json({
            msg: "Email pas trouvé",
            success: false,
            email: false,
            password: false
        });
    }
    
    //if there is admin we are now going to compare the password
    bcrypt.compare(password, admin.password).then(isMatch => {
        if(isMatch) {
            const jwt_payload = {
                _id: admin.id,
                email: admin.email,
                password: admin.password,
                role: 'admin'
            }
            jwt.sign(jwt_payload, key, {
                expiresIn: 604800
            },(err, token) => {
                return res.status(200).json({
                    success: true,
                    token: 'Bearer '+ token,
                    admin: admin,
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
        next();
    });
};


//ajouter un nouvel enseignant
exports.nouveau = async (req, res) => {
    /*

    
    let { email,password, confirm_password } = req.body

    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match."
        });
    }

    //check for the unique email
    const adminWithEmail = await Admin.findOne ({
        where: {
            email: email
        }
    })
    if(adminWithEmail) {
        return res.status(400).json({
            msg: "this email is already registred. Did you forgot your password?",
            admin: adminWithEmail
        });
    }

    //the data is valid and now we can register the admin
    let newAdmin = new Admin({
        email,
        password
    });
    
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if(err) throw errow;
            newAdmin.password = hash;
            newAdmin.save().then(admin => {
                return res.status(201).json({
                    success: true,
                    msg: "admin registred successfully",
                    admin: admin
                });
            });
        });
    });
    */
    
    let { nom, email, password, confirm_password } = req.body

    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match."
        });
    }

    //check for the unique email
    const enseignantWithEmail = await Enseignant.findOne ({
        where: {
            email: email
        }
    })
    if(enseignantWithEmail) {
        return res.status(400).json({
            msg: "this email is already registred. Did you forgot your password?",
            admin: enseignantWithEmail
        });
    }

    //the data is valid and now we can register the admin
    let newEnseignant= {
        //let newEnseignant= new Enseignant({
        nom,
        email,
        password
    };
    
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newEnseignant.password, salt, (err, hash) => {
            if(err) throw errow;
            newEnseignant.password = hash;
            Enseignant.create(newEnseignant).then(enseignant => {
               // newEnseignant.save().then(enseignant => {
                enseignant.createAdmin(this);
                return res.status(201).json({
                    success: true,
                    msg: "enseignant registred successfully",
                    enseignant: enseignant
                });
            });
        });
    });

};
