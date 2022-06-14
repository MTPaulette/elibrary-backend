const Model = require('../models');

const { Ue, Filiere, Niveau, Specialite } = Model;

// find all filiere from the database
exports.findAll = (req, res) => {
  Ue.findAll().then((ues) => res.status(201).json({
    success: true,
    msg: 'toutes les ues',
    ues,
  }));
};


exports.findByFiliereNiveauId = async (req, res) => {
  //check for the unique id
  const ues = await Ue.findAll({
      where: {
          FiliereId: req.body.filiereId,
          NiveauId: req.body.niveauId
      },
      include: [Filiere, Niveau, Specialite]
  })
  if (ues) {
      return res.status(201).json({
          success: true,
          ues
      });
  } else {
      return res.status(500).json({
          success: false
      });
  }
};