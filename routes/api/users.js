const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../../controllers/userController');
const jwt = require('jsonwebtoken');
const helper = require('../../utils/helper.js')

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

 router.post('/ajouterEnseignant', passport.authenticate('jwt', { session: false }),(req,res) => {
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
 * @route POST api/users/login
 * @desc login the user
 * @access Public
 */
router.post('/login',(req,res) => {UserController.login(req,res)});

/**
 * @route get api/users/bloquerenseignant
 * @desc pour permettre le blocage des comptes enseignants par l'admin
 * @access Public
 */

/****************************************gestion des utilisateurs************************************* */
 router.get('/bloquerUser/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'bloquer_user').then(rolePerm => {
            if(rolePerm){
                UserController.bloquerUser(req,res)
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

 router.get('/debloquerUser/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.debloquerUser(req,res)
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

 router.get('/supprimerUser/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.supprimerUser(req,res)
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

/****************************************gestion de la recherche des utilisateurs************************************* */


module.exports = router;