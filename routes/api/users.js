const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../../controllers/userController');
const jwt = require('jsonwebtoken');
const helper = require('../../utils/helper.js')

//require('../../config/passport');

router.get('/',(req,res) => {
    res.send('hello');
}); 


/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */
router.post('/registerAdmin',(req,res) => {UserController.registerAdmin(req,res)});

/**
 * @route POST api/users/login
 * @desc login the user
 * @access Public
 */
router.post('/login',(req,res) => {UserController.login(req,res)});

/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */
 router.post('/register',(req,res) => {UserController.register(req,res)});


/**
 * @route post api/users/ajouterenseignant
 * @desc pour permettre la creation des cmptes enseignants par l'admin
 * @access Public
 */

 router.post('/register', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.register(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/bloquerenseignant
 * @desc pour permettre le blocage des comptes enseignants par l'admin
 * @access Public
 */

 router.get('/bloquerEnseignant/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.bloquerEnseignant(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/debloquerEnseignant
 * @desc pour permettre le blpcage des comptes enseignants par l'admin
 * @access Public
 */

 router.get('/debloquerEnseignant/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.debloquerEnseignant(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/supprimerenseignant
 * @desc pour permettre le blpcage des comptes enseignants par l'admin
 * @access Public
 */

 router.get('/supprimerEnseignant/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.supprimerEnseignant(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/****************************************gestion des etudiants************************************* */

/**
 * @route get api/users/bloqueretudant
 * @desc pour permettre le blocage des comptes etudants par l'admin
 * @access Public
 */
 router.get('/bloquerEtudant/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_etudant').then(rolePerm => {
            if(rolePerm){
                UserController.bloquerEtudant(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/debloquerEtudant
 * @desc pour permettre le blpcage des comptes etudants par l'admin
 * @access Public
 */

 router.get('/debloquerEtudant/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_etudant').then(rolePerm => {
            if(rolePerm){
                UserController.debloquerEtudant(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

module.exports = router;