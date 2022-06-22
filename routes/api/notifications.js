const express = require('express');
const router = express.Router();
const passport = require('passport');
const NotificationController = require('../../controllers/notificationController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les notifications de notification de la bd
 * @access Public
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { NotificationController.create(req,res)});
router.get('/notifications', passport.authenticate('jwt', { session: false }), (req, res) => { NotificationController.findAll(req,res)});

module.exports = router;