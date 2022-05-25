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
        AdminController.nouveau(req,res);
    } else {
        return res.json({
            admin: req.user,
            msgError: 'cest un utilisateur bbhhh'
        });  
    }
});

/**
 * @route POST api/admins/nouveau_enseignant
 * @desc ajouterEnseignant par un admin
 * @access Public
 */
 router.post('/nouveau_enseignant',(req,res) => {AdminController.nouveau(req,res)});


 router.post('/check',checkAuth, (req,res) => {AdminController.nouveau(req,res)});

module.exports = router;