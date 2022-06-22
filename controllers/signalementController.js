const { Signalement, Document, User, Raison } = require("../models/index");
/**
 * =========================================================== gestion des utilisateurs ======================================================
 */

//ajouter un nouvel signalement
exports.create = async (req, res) => {
    let { description, RaisonId, DocumentId} = req.body;

    //the data is valid and now we can register the admin
    let newSignalement= {
        DocumentId
    };

    if(RaisonId) {
        newSignalement.RaisonId = RaisonId
    }

    if(description) {
        newSignalement.description = description
    }

    Signalement.create(newSignalement).then(signalement => {
        if(signalement) {
            signalement.setUser(req.user);
            global.io.emit('NEW_SIGNALEMENT', signalement);
            return res.status(201).json({
                success: true,
                msg: "signalement registred successfully",
                signalement: signalement
            });

        }else {
            return res.status(201).json({
                success: true,
                msg: "signalement registred successfully",
                signalement: signalement
            });

        }
    });
  //});
};


//recuperer tous les signalements de la bd
exports.findAll = (req, res) => {
    Signalement.findAll({
        include: [Document, User, Raison]
    }).then(signalements => {
        return res.status(201).json({
            success: true,
            msg: "toutes les signalements",
            signalements
        });
    });
};

/**================================================================================================================================================ */
