const express = require('express');
const router = express.Router();
const FiliereController = require('../../controllers/filiereController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les filiers de la bd
 * @access Public
 */
router.get('/filieres',(req,res) => {FiliereController.findAll(req,res)});

module.exports = router;