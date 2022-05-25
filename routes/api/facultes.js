const express = require('express');
const router = express.Router();
const FaculteController = require('../../controllers/faculteController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les filiers de la bd
 * @access Public
 */
router.get('/facultes',(req,res) => {FaculteController.findAll(req,res)});

module.exports = router;