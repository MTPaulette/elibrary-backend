const { User } = require("../models/index");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require("../models/index").key;

const { Op } = require("sequelize");
/**
 * =========================================================== gestion des utilisateurs ======================================================
 */
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

//ajouter un nouvel user
exports.register = async (req, res) => {
    
    let { nom, email, password, confirm_password } = req.body
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

    //the data is valid and now we can register the admin
    let newUser= {
        //let newUser= new User({
        nom,
        email,
        password
    };
    
    //hash the password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            User.create(newUser).then(user => {
                if(!req.user) {
                    user.setRole(3);
                }else {
                    if(req.user.RoleId == 1) {
                        user.setAdmin(1);
                        user.setRole(2);
                    }
                }
                return res.status(201).json({
                    success: true,
                    msg: "user registred successfully",
                    user: user
                });
            });
        });
    });

};

//blouer un nouvel utilisateur
exports.bloquerUser = async (req, res) => {

    //check for the unique id
    const userWithId = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!userWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    userWithId.update({etat: "bloqué"}).then(user => {
        user.setAdmin(req.user.RoleId);
        //user.setAdminBloqueur(req.user.instance);
        return res.status(201).json({
            success: true,
            msg: "user bloqué avec success",
            user_bloqué: user
        });
    });
};

//deblouer un nouvel user
exports.debloquerUser = async (req, res) => {
    //check for the unique id
    const userWithId = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!userWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    userWithId.update({etat: "actif"}).then(user => {
        return res.status(201).json({
            success: true,
            msg: "user debloque",
            user_debloqué: user
        });
    });
};

//supprime un nouvel user
exports.supprimerUser = async (req, res) => {

    //check for the unique id
    const userWithId = await User.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!userWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    userWithId.update({etat: "supprimé"}).then(user => {
        return res.status(201).json({
            success: true,
            msg: "user supprimé avec success",
            user_bloqué: user
        });
    });
};

/**
 * =========================================================== gestion de la recherche des utilisateurs===========================================================
 */
//find all user from the database
exports.findAllUser = async (req, res) => {
    //check for the unique id
    /*
    const allUser = await User.findAll({
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.col('email')), 'n']
            ]
        }
    });*/
    let allUser = {}
    if (!req.RoleId) {
        allUser = await User.findAll();
    } else {
        allUser = await User.findAll({
            where: {
                RoleId: req.RoleId
            }
        }); 
    }
    if (allUser) {
        return res.status(201).json({
            success: true,
            allUser: allUser
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
};

//recherche de tous les enseigants bloqués
exports.findAllUserState = async (req, res) => {
    //check for the unique id
    const allUser = await User.findAll({
        where: {
            RoleId: req.RoleId,
            etat: req.etat
        }
    });
    if (allUser) {
        return res.status(201).json({
            success: true,
            allUser: allUser
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
};

//recherche de tous les enseigants bloqués
exports.findOneUser = async (req, res) => {
    //check for the unique id
    const allUser = await User.findAll({
        where: {
            nom: {
                [Op.substring]: req.params.nom,
            },
            RoleId: req.RoleId,
            etat: req.etat
        }
    });
    if (allUser) {
        return res.status(201).json({
            success: true,
            allUser: allUser
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
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

/**================================================================================================================================================ */
