const Model = require('../models');

const { Type } = Model;

// find all filiere from the database
exports.findAll = (req, res) => {
  Type.findAll().then((types) => res.status(201).json({
    success: true,
    msg: 'toutes les types',
    types,
  }));
};
