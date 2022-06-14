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


//find all user from the database
exports.findByfaculte = async (req, res) => {
    const allFiliere = await Filiere.findAll({
        where: {
            FaculteId: req.params.faculte
        }
    }); 
    if (allFiliere) {
        return res.status(201).json({
            success: true,
            filieres: allFiliere
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
};

//find a single filiere with an id
exports.findOne = async (req, res) => {

    const filiere = await Filiere.findOne({
        where: {
            id: req.params.id
        }
    }); 
    if (filiere) {
        return res.status(201).json({
            success: true,
            filiere: filiere
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
    
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
