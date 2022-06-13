const express = require('express');
const router = express.Router();
const NiveauController = require('../../controllers/niveauController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les filiers de la bd
 * @access Public
 */
router.get('/niveaux',(req,res) => {NiveauController.findAll(req,res)});

module.exports = router;