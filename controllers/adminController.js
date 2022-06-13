const Models = require("../models/index");
const bcrypt = require('bcryptjs');
const e = require("express");
const jwt = require('jsonwebtoken');

const key = Models.key;
const Admin = Models.Admin;
const Enseignant = Models.Enseignant;
const Etudiant = Models.Etudiant

const { Op } = require("sequelize");

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
exports.login = async (req, res) => {

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
    });
};


/**
 * =========================================================== administrer les enseignants ======================================================
 */

//ajouter un nouvel enseignant
exports.ajouterEnseignant = async (req, res) => {
    
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
            if(err) throw err;
            newEnseignant.password = hash;
            Enseignant.create(newEnseignant).then(enseignant => {
                enseignant.setAdmin(req.user.instance);
                return res.status(201).json({
                    success: true,
                    msg: "enseignant registred successfully",
                    admin: req.user,
                    enseignant: enseignant
                });
            });
        });
    });

};

//blouer un nouvel enseignant
exports.bloquerEnseignant = async (req, res) => {

    //check for the unique id
    const enseignantWithId = await Enseignant.findOne({
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
    const enseignantWithId = await Enseignant.findOne({
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
            msg: "enseignant debloue",
            enseignant_bloqué: enseignant
        });
    });
};

//supprime un nouvel enseignant
exports.supprimerEnseignant = async (req, res) => {

    //check for the unique id
    const enseignantWithId = await Enseignant.findOne({
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

//supprime un nouvel enseignant
exports.check = async (req, res) => {
    
    let { nom, email, password, confirm_password } = req.body
    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match.",
            password,
            confirm_password,
            nom,
            email
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
    

    return res.status(201).json({
        success: true,
        msg: "enseignant registred successfully",
        admin: req.user.instance
    });
    /*
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newEnseignant.password, salt, (err, hash) => {
            if(err) throw err;
            newEnseignant.password = hash;
            Enseignant.create(newEnseignant).then(enseignant => {
                enseignant.setAdmin(req.user.instance);
                return res.status(201).json({
                    success: true,
                    msg: "enseignant registred successfully",
                    admin: req.user,
                    enseignant: enseignant
                });
            });
        });
    });
    */

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
        //etudiant.setAdmin(req.user.instance);
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
        return res.status(201).json({
            success: true,
            msg: "etudiant debloue",
            etudiant_bloqué: etudiant
        });
    });
};

/**================================================================================================================================================ */

/**
 * =========================================================== administrer les livres ======================================================
 */

//ajouter un nouvel livre
exports.ajouterLivre = async (req, res) => {
    
    let { nom, email, password, confirm_password } = req.body
    //check the confirm password
    if(password !== confirm_password){
        return res.status(400).json({
            msg: "password do not match."
        });
    }

    //check for the unique email
    const livreWithEmail = await Livre.findOne ({
        where: {
            email: email
        }
    })
    if(livreWithEmail) {
        return res.status(400).json({
            msg: "this email is already registred. Did you forgot your password?",
            admin: livreWithEmail
        });
    }

    //the data is valid and now we can register the admin
    let newLivre= {
        nom,
        email,
        password
    };
    
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newLivre.password, salt, (err, hash) => {
            if(err) throw err;
            newLivre.password = hash;
            Livre.create(newLivre).then(livre => {
                livre.setAdmin(req.user.instance);
                return res.status(201).json({
                    success: true,
                    msg: "livre registred successfully",
                    admin: req.user,
                    livre: livre
                });
            });
        });
    });

};

//blouer un nouvel livre
exports.bloquerLivre = async (req, res) => {

    //check for the unique id
    const livreWithId = await Livre.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!livreWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    livreWithId.update({etat: "bloqué"}).then(livre => {
        return res.status(201).json({
            success: true,
            msg: "livre bloqué avec success",
            livre_bloqué: livre
        });
    });
};

//deblouer un nouvel livre
exports.debloquerLivre = async (req, res) => {
    //check for the unique id
    const livreWithId = await Livre.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!livreWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    livreWithId.update({etat: "actif"}).then(livre => {
        return res.status(201).json({
            success: true,
            msg: "livre debloue",
            livre_bloqué: livre
        });
    });
};

//supprime un nouvel livre
exports.supprimerLivre = async (req, res) => {

    //check for the unique id
    const livreWithId = await Livre.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!livreWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    livreWithId.update({etat: "supprimé"}).then(livre => {
        return res.status(201).json({
            success: true,
            msg: "livre supprimé avec success",
            livre_bloqué: livre
        });
    });
};
/**================================================================================================================================================ */