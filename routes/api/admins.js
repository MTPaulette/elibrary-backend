const express = require('express');
const router = express.Router();
const passport = require('passport');
const AdminController = require('../../controllers/adminController');
const jwt = require('jsonwebtoken');

const checkAuth = require('../../middleware/check-auth');

/**
 * @route POST api/admins/register
 * @desc Register the admin
 * @access Public
 */
router.post('/register',(req,res) => {AdminController.create(req,res)});

/**
 * @route POST api/admins/login
 * @desc login the admin
 * @access Public
 */
router.post('/login',(req,res) => {AdminController.login(req,res)});
/**
 * @route get api/admins/profile
 * @desc get the admin's data
 * @access Public
 */
router.post('/nouveau', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.ajouterEnseignant(req,res);
    } else {
        return res.json({
            admin: req.user,
            msgError: 'cest un utilisateur bbhhh'
        });  
    }
});

/**
 * @route POST api/admins/ajouterEnseignant
 * @desc ajouterEnseignant par un admin
 * @access Public
 */
 router.post('/ajouterEnseignant',(req,res) => {AdminController.ajouterEnseignant(req,res)});

 /**
  * @route POST api/admins/bloquerEnseignant
  * @desc bloquer un Enseignant par un admin
  * @access Public
  */
 router.post('/bloquerEnseignant',(req,res) => {AdminController.bloquerEnseignant(req,res)});

/**
 * @route POST api/admins/debloquerEnseignant
 * @desc debloquer un Enseignant par un admin
 * @access Public
 */
 router.post('/debloquerEnseignant',(req,res) => {AdminController.debloquerEnseignant(req,res)});

/**
 * @route POST api/admins/supprimerEnseignant
 * @desc supprimer un Enseignant par un admin
 * @access Public
 */
 router.post('/supprimerEnseignant',(req,res) => {AdminController.supprimerEnseignant(req,res)});


 router.post('/check', passport.authenticate('jwt', { session: false }) ,(req,res) => {AdminController.check(req,res)});

 //router.post('/check',checkAuth, (req,res) => {AdminController.check(req,res)});
 //router.post('/check',checkAuth, (req,res) => {AdminController.nouveau(req,res)});

module.exports = router;