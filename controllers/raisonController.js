const Model = require('../models')
const Raison = Model.Raison;

const { Op } = require("sequelize");


//find all filiere from the database
exports.findAll = (req, res) => {
    Raison.findAll().then(raisons => {
        return res.status(201).json({
            success: true,
            msg: "toutes les raisons",
            raisons: raisons
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
