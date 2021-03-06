const { Document, Faculte, Filiere, Niveau, Specialite, Type, Ue, User } = require("../models/index");
const { Op } = require("sequelize");
/**
 * =========================================================== gestion des utilisateurs ======================================================
 */

//ajouter un nouvel document
exports.createDocument = async (req, res) => {
    let { titre, resume, auteur, type, FaculteId, FiliereId, NiveauId, SpecialiteId} = req.body;
    //the data is valid and now we can register the admin
    
    let newDocument= {
        titre,
        resume,
        auteur,
        type,
        contenu: req.file.originalname,
        FaculteId,
        FiliereId,
        NiveauId,
        SpecialiteId
    };

    Document.create(newDocument).then(document => {
        if(document) {
            document.setUser(req.user);
            const role = req.user.RoleId;
            if(role == 3) {
                document.setType(1);
            }else {
                document.setType(type);
            }
            
            return res.status(201).json({
                success: true,
                msg: "document registred successfully",
                document: document
            });

        }else {
            return res.status(201).json({
                success: true,
                msg: "document registred successfully",
                document: document
            });

        }
        
    });
  //});
};

//recherche de tous les enseigants bloqués
exports.findOneDocument = async (req, res) => {
    //check for the unique id
    const allDocument = await Document.findByPk({
        where: {
            id: req.params.id,
        }
    });
    if (allDocument) {
        return res.status(201).json({
            success: true,
            document: download()
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
};

//blouer un nouvel utilisateur
exports.bloquerDocument = async (req, res) => {

    //check for the unique id
    const documentWithId = await Document.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!documentWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    documentWithId.update({etat: "bloqué"}).then(document => {
        if (document) {
            return res.status(201).json({
                success: true,
                msg: "document bloqué avec success",
                document_bloqué: document
            });      
        } else {
            return res.status(500).json({
                success: false,
                msg: "erreur: blocage du document",
            });   
        }
    });
};

//deblouer un nouvel document
exports.debloquerDocument = async (req, res) => {
    //check for the unique id
    const documentWithId = await Document.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!documentWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    documentWithId.update({etat: "actif"}).then(document => {
        if (document) {
            return res.status(201).json({
                success: true,
                msg: "document debloqué avec success",
                document_bloqué: document
            });      
        } else {
            return res.status(500).json({
                success: false,
                msg: "erreur: deblocage du document",
            });   
        }
    });
};

//deblouer un nouvel document
exports.supprimerDocument = async (req, res) => {
    //check for the unique id
    const documentWithId = await Document.findOne({
        where: {
            id: req.params.id
        }
    })
    if(!documentWithId) {
        return res.status(400).json({
            success: false,
            msg: "email pas trouvé",
        });
    }
    documentWithId.update({etat: "supprimé"}).then(document => {
        if (document) {
            return res.status(201).json({
                success: true,
                msg: "document supprimé avec success",
                document_bloqué: document
            });      
        } else {
            return res.status(500).json({
                success: false,
                msg: "erreur: suppression du document",
            });   
        }
    });
};
/**
 * =========================================================== gestion de la recherche des utilisateurs===========================================================
 */
//find all document from the database
exports.findAllDocument = async (req, res) => {
    allDocument = await Document.findAll();
    if (allDocument) {
        return res.status(201).json({
            success: true,
            allDocument: allDocument
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
};

//recherche de tous les enseigants bloqués
exports.findAllDocumentState = async (req, res) => {
    //check for the unique id
    const allDocument = await Document.findAll({
        where: {
            etat: req.etat
        },
        include: [Faculte, Filiere, Niveau, Specialite, Type, Ue]
    });
    if (allDocument) {
        return res.status(201).json({
            success: true,
            allDocument: allDocument
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
};

exports.findAllDocumentByName = async (req, res) => {
    //check for the unique id
    const allDocument = await Document.findAll({
        where: {
            [Op.or]: [
                {
                    titre: {
                        [Op.substring]: req.params.nom,
                    } 
                },
                {
                    contenu: {
                        [Op.substring]: req.params.nom,
                    } 
                },
                {
                    resume: {
                        [Op.substring]: req.params.nom,
                    } 
                },
            ],
            etat: req.etat
        },
        include: [Faculte, Filiere, Niveau, Specialite, Type, Ue, User]
    });
    if (!allDocument) {
        return res.json({
            success: false
        });
    }
        return res.status(201).json({
            success: true,
            allDocument: allDocument
        });
    
};

exports.findAllDocumentByUe = async (req, res) => {
    //check for the unique id
    const allDocument = await Document.findAll({
        where: {
            UeId: req.params.ue,
            etat: req.etat
        },
        include: [Faculte, Filiere, Niveau, Specialite, Type, Ue, User]
    });
    if (!allDocument) {
        return res.json({
            success: false
        });
    }
        return res.status(201).json({
            success: true,
            allDocument: allDocument
        });
    
};
exports.findAllDocumentByFiliere = async (req, res) => {
    //check for the unique id
    const allDocument = await Document.findAll({
        where: {
            FiliereId: req.params.filiere,
            etat: req.etat
        },
        include: [Faculte, Filiere, Niveau, Specialite, Type, Ue, User]
    });
    if (!allDocument) {
        return res.json({
            success: false
        });
    }
        return res.status(201).json({
            success: true,
            allDocument: allDocument
        });
    
};


//recherche de tous les enseigants bloqués
exports.findDocumentByUserId = async (req, res) => {
    //check for the unique id
    const allDocument = await Document.findAll({
        where: {
            UserId: req.params.id
        },
        include: [Faculte, Filiere, Niveau, Specialite, Type, Ue, User]
    });
    if (allDocument) {
        return res.status(201).json({
            success: true,
            allDocument: allDocument
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
};

//update document by the id in the request
exports.update = (req, res) => {

};
//delete document with specific id
exports.delete = (req, res) => {

};

//delete all the document
exports.deleteAll = (req, res) => {

};

//find all published documents
exports.findAllPublished = (req, res) => {

};

/**================================================================================================================================================ */
