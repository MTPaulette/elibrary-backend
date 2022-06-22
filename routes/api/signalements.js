const express = require('express');
const router = express.Router();
const passport = require('passport');
const SignalementController = require('../../controllers/signalementController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les signalements de signalement de la bd
 * @access Public
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { SignalementController.create(req,res)});
router.get('/signalements', passport.authenticate('jwt', { session: false }), (req, res) => { SignalementController.findAll(req,res)});

module.exports = router;