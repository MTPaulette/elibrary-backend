const Model = require('../models')

const Niveau = Model.Niveau;


//find all filiere from the database
exports.findAll = (req, res) => {
    Niveau.findAll().then(niveaux => {
        return res.status(201).json({
            success: true,
            msg: "toutes les niveaux",
            niveaux: niveaux
        });
    });
};

//find a single filiere with an id
exports.findOne = (req, res) => {
    
};


//update filiere by the id in the request
exports.update = (req, res) => {

};

//delete filiere with specific id
exports.delete = (req, res) => {

};

//delete all the filiere
exports.deleteAll = (req, res) => {

};
