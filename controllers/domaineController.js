const { Domaine } = require("../models/index");
const bcrypt = require('bcryptjs');

const { Op } = require("sequelize");
/**
 * =========================================================== gestion des utilisateurs ======================================================
 */

//ajouter un nouvel domaine
exports.createDomaine = async (req, res) => {
    let { nom} = req.body;

    //the data is valid and now we can register the admin
    let newDomaine= {
        nom
    };

    Domaine.create(newDomaine).then(domaine => {
        if(domaine) {
            domaine.setUser(req.user);
            return res.status(201).json({
                success: true,
                msg: "domaine registred successfully",
                domaine: domaine
            });

        }else {
            return res.status(201).json({
                success: true,
                msg: "domaine registred successfully",
                domaine: domaine
            });

        }
    });
  //});
};

//find all domaine from the database
exports.findAll = (req, res) => {
    Domaine.findAll().then(domaines => {
        return res.status(201).json({
            success: true,
            msg: "toutes les domaines",
            domaines: domaines
        });
    });
};


//find all user from the database
exports.findBydomaine = async (req, res) => {
    const allDomaine = await Domaine.findAll({
        where: {
            id: req.params.domaine
        }
    }); 
    if (allDomaine) {
        return res.status(201).json({
            success: true,
            domaines: allDomaine
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
};

/**================================================================================================================================================ */
