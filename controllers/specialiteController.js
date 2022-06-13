const Model = require('../models')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require("../models/index").key;

const Faculte = Model.Faculte;
const Specialite = Model.Specialite;

const { Op } = require("sequelize");


//find all filiere from the database
exports.findAll = (req, res) => {
    Specialite.findAll().then(specialites => {
        return res.status(201).json({
            success: true,
            msg: "toutes les specialites",
            specialites: specialites
        });
    });
};


//find all user from the database
exports.findByfaculte = async (req, res) => {
    const allSpecialite = await Specialite.findAll({
        where: {
            FaculteId: req.params.faculte
        }
    }); 
    if (allSpecialite) {
        return res.status(201).json({
            success: true,
            specialites: allSpecialite
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
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
