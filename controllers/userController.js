const { User } = require("../models/index");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportjS = require('../middleware/passport').passport;
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
exports.registerAdmin = async (req, res) => {
    
    let { email,password, confirm_password, role } = req.body
    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match."
        });
    }

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
    let newUser = {
        nom: 'admin',
        email,
        password
    };

    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw errow;
            newUser.password = hash;

            User.create(newUser).then(user => {
                user.setRole(1);
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

    let { email,password } = req.body;
    const user = await User.findOne ({
        where: {
            email: email
        }
    })

    if(!user) {
        return res.status(400).json({
            msg: "Email pas trouvé",
            success: false,
            email: false,
            password: false
        });
    }
    
    //if there is user we are now going to compare the password
    bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
            const jwt_payload = {
                _id: user.id,
                email: user.email,
                password: user.password,
                role: user.RoleId
                //role: 'utilisateur'
            }
            jwt.sign(jwt_payload, key, {
                expiresIn: 604800
            },(err, token) => {
                return res.status(200).json({
                    success: true,
                    token: 'Bearer '+ token,
                    user: user,
                    msg: "Bingo!!! vous êtes connectés",
                    password: true,
                    email: true
                });
            })
        }else {
            return res.status(400).json({
                msg: "mot de passe incorrect",
                success: false,
                password: false
            });
        }
    });
};


/**
 * =========================================================== administrer les enseignants ======================================================
 */

//ajouter un nouvel enseignant
exports.register = async (req, res) => {
    
    let { nom, email, password, confirm_password } = req.body
    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match."
        });
    }

    //check for the unique email
    const enseignantWithEmail = await User.findOne ({
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
            if(err) throw err;
            newEnseignant.password = hash;
            User.create(newEnseignant).then(enseignant => {
                if(!req.user) {
                    enseignant.setRole(3);
                }else {
                    if(req.user.RoleId == 1) {
                        enseignant.setAdmin(1);
                        enseignant.setRole(2);
                    }
                }
                return res.status(201).json({
                    success: true,
                    msg: "enseignant registred successfully",
                    enseignant: enseignant
                });
            });
        });
    });

};

//blouer un nouvel enseignant
exports.bloquerEnseignant = async (req, res) => {

    //check for the unique id
    const enseignantWithId = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!enseignantWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    enseignantWithId.update({etat: "bloqué"}).then(enseignant => {
        return res.status(201).json({
            success: true,
            msg: "enseignant bloqué avec success",
            enseignant_bloqué: enseignant
        });
    });
};

//deblouer un nouvel enseignant
exports.debloquerEnseignant = async (req, res) => {
    //check for the unique id
    const enseignantWithId = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!enseignantWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    enseignantWithId.update({etat: "actif"}).then(enseignant => {
        return res.status(201).json({
            success: true,
            msg: "enseignant debloque",
            enseignant_debloqué: enseignant
        });
    });
};

//supprime un nouvel enseignant
exports.supprimerEnseignant = async (req, res) => {

    //check for the unique id
    const enseignantWithId = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!enseignantWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    enseignantWithId.update({etat: "supprimé"}).then(enseignant => {
        return res.status(201).json({
            success: true,
            msg: "enseignant supprimé avec success",
            enseignant_bloqué: enseignant
        });
    });
};
/**================================================================================================================================================ */

/**
 * =========================================================== administrer les etudiants ===========================================================
 */

//blouer un nouvel etudiant
exports.bloquerEtudiant = async (req, res) => {

    //check for the unique id
    const etudiantWithId = await Etudiant.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!etudiantWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    etudiantWithId.update({etat: "bloqué"}).then(etudiant => {
        etudiant.setAdmin(req.user.RoleId);
        //etudiant.setAdminBloqueur(req.user.instance);
        return res.status(201).json({
            success: true,
            msg: "etudiant bloqué avec success",
            etudiant_bloqué: etudiant
        });
    });
};

//deblouer un nouvel etudiant
exports.debloquerEtudiant = async (req, res) => {
    //check for the unique id
    const etudiantWithId = await Etudiant.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!etudiantWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    etudiantWithId.update({etat: "actif"}).then(etudiant => {
        etudiant.setAdmin(req.user.RoleId);
        return res.status(201).json({
            success: true,
            msg: "etudiant debloue",
            etudiant_bloqué: etudiant
        });
    });
};

/**================================================================================================================================================ */
