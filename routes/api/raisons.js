const express = require('express');
const router = express.Router();
const RaisonController = require('../../controllers/raisonController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les raisons de signalement de la bd
 * @access Public
 */
router.get('/raisons',(req,res) => {RaisonController.findAll(req,res)});

module.exports = router;