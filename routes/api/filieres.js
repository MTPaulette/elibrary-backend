const express = require('express');
const router = express.Router();
const FiliereController = require('../../controllers/filiereController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les filiers de la bd
 * @access Public
 */
router.get('/filieres',(req,res) => {FiliereController.findAll(req,res)});

router.get('/filiere/faculte/:faculte',(req,res) => {FiliereController.findByfaculte(req,res)});

router.get('/filiere/:id',(req,res) => {FiliereController.findOne(req,res)});

module.exports = router;