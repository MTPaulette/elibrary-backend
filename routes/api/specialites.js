const express = require('express');
const router = express.Router();
const SpecialiteController = require('../../controllers/specialiteController');

/**
 * @route GET api/specialites/specialites
 * @desc recuperer toutes les filiers de la bd
 * @access Public
 */
router.get('/specialites',(req,res) => {SpecialiteController.findAll(req,res)});

router.get('/specialite/:faculte',(req,res) => {SpecialiteController.findByfaculte(req,res)});

module.exports = router;