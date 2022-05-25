const Model = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require("../models/index").key;

const Faculte = Model.Faculte;
const Filiere = Model.Filiere;

const { Op } = require("sequelize");


//find all filiere from the database
exports.findAll = (req, res) => {
    Filiere.findAll().then(filieres => {
        return res.status(201).json({
            success: true,
            msg: "toutes les filieres",
            filieres: filieres
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
