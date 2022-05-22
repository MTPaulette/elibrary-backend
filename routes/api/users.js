const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../../controllers/userController');
const jwt = require('jsonwebtoken');

//require('../../config/passport');

router.get('/',(req,res) => {
    res.send('hello');
}); 


/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */
router.post('/register',(req,res) => {UserController.create(req,res)});

/**
 * @route POST api/users/login
 * @desc login the user
 * @access Public
 */
router.post('/login',(req,res) => {UserController.login(req,res)});
/**
 * @route get api/users/profile
 * @desc get the user's data
 * @access Public
 */


router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        user: req.user,
    });
});


module.exports = router;