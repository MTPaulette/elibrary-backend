const express = require('express');

const router = express.Router();
const UeController = require('../../controllers/ueController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les filiers de la bd
 * @access Public
 */
router.get('/ues', (req, res) => { UeController.findAll(req, res); });
router.post('/ues', (req, res) => { UeController.findByFiliereNiveauId(req, res); });

module.exports = router;
