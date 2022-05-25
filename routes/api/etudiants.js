const express = require('express');
const router = express.Router();
const passport = require('passport');
const EtudiantController = require('../../controllers/etudiantController');
const jwt = require('jsonwebtoken');

//require('../../config/passport');

router.get('/',(req,res) => {
    res.send('hello');
}); 


/**
 * @route POST api/etudiants/register
 * @desc Register the etudiant
 * @access Public
 */
router.post('/register',(req,res) => {EtudiantController.create(req,res)});

/**
 * @route POST api/etudiants/login
 * @desc login the etudiant
 * @access Public
 */
router.post('/login',(req,res) => {EtudiantController.login(req,res)});
/**
 * @route get api/etudiants/profile
 * @desc get the etudiant's data
 * @access Public
 */


router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        etudiant: req.etudiant,
    });
});

module.exports = router;