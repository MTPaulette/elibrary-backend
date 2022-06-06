const Model = require('../models');

const { Ue } = Model;

// find all filiere from the database
exports.findAll = (req, res) => {
  Ue.findAll().then((ues) => res.status(201).json({
    success: true,
    msg: 'toutes les ues',
    ues,
  }));
};
