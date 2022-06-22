const express = require('express');

const router = express.Router();
const TypeController = require('../../controllers/typeController');

/**
 * @route GET api/filieres/filieres
 * @desc recuperer toutes les filiers de la bd
 * @access Public
 */
router.get('/types', (req, res) => { TypeController.findAll(req, res); });

module.exports = router;
