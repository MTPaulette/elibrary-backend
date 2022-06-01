const express = require('express');
const router = express.Router();
const path = require("path");
const passport = require('passport');
const DocumentController = require('../../controllers/documentController');
const helper = require('../../utils/helper.js');
const multer = require("multer");

const app = express();

    app.use(express.static(`${__dirname}/public`));
    //Configuration for Multer
    const multerStorage = multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        //cb(null, `${contenu.name}-${Date.now()}.${ext}`);
        cb(null, `upload/admin-${file.originalname}-${Date.now()}.${ext}`);
    },
    });
    
    // Multer Filter
    const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };
  
  //Calling the "multer" Function
  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

/**
 * @route post api/users/ajouterdocument
 * @desc pour permettre la creation des cmptes documents par l'admin
 * @access Public
 */
/*
 router.post('/createDocument', upload.single('myFile'), (req,res) => {
        DocumentController.createDocument(req,res);
});
*/
 router.post('/createDocument',   upload.single('myFile'), passport.authenticate('jwt',{ session: false }),(req, document, res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_document').then(rolePerm => {
            if(rolePerm){
                DocumentController.createDocument(req, document, res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});


/****************************************gestion des utilisateurs************************************* */
/**
 * @route get api/users/bloquerdocument
 * @desc pour permettre le blocage des comptes documents par l'admin
 * @access Public
 */
 router.get('/bloquerDocument/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_document').then(rolePerm => {
            if(rolePerm){
                DocumentController.bloquerDocument(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/debloquerDocument
 * @desc pour permettre le blocage des comptes documents par l'admin
 * @access Public
 */
 router.get('/debloquerDocument/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_document').then(rolePerm => {
            if(rolePerm){
                DocumentController.debloquerDocument(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/supprimerDocument
 * @desc pour permettre le blocage des comptes documents par l'admin
 * @access Public
 */
 router.get('/supprimerDocument/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_document').then(rolePerm => {
            if(rolePerm){
                DocumentController.supprimerDocument(req,res)
            }else{
                return res.json({
                    success: false,
                    msg: 'role ou permission incompatible',
                    rolePerm: rolePerm
                });
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});



/****************************************gestion des documents************************************* */
/**
 * @route get api/users/tousDocuments
 * @desc pour recherche tous les documents
 * @access Public
 */
 router.get('/tousDocuments', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                const req = {
                    RoleId: 2
                }
                UserController.findAllUser(req,res)
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/TousDocumentsActifs
 * @desc pour recherche tous les documents actifs
 * @access Public
 */

 router.get('/TousDocumentsActifs', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                const req = {
                    RoleId: 2,
                    etat: 'actif'
                }
                UserController.findAllUserState(req,res)
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/TousDocumentsBloques
 * @desc pour recherche tous les documents bloqués
 * @access Public
 */
 router.get('/TousDocumentsBloques', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                const req = {
                    RoleId: 2,
                    etat: 'bloqué'
                }
                UserController.findAllUserState(req,res)
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});


/**
 * @route get api/users/TousDocumentsSupprimes
 * @desc pour recherche tous les documents supprimés
 * @access Public
 */
 router.get('/TousDocumentsSupprimes', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                const req = {
                    RoleId: 2,
                    etat: 'supprimé'
                }
                UserController.findAllUserState(req,res)
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/documentActif
 * @desc pour rechercher un document actif par son nom
 * @access Public
 */
 router.get('/documentActif/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'rechercher_document').then(rolePerm => {
            if(rolePerm){
                req.RoleId = 2;
                req.etat = 'actif';
                UserController.findOneUser(req,res);
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/documentBloque
 * @desc pour rechercher un document actif par son nom
 * @access Public
 */
 router.get('/documentBloque/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                req.RoleId = 2;
                req.etat = 'bloque';
                UserController.findOneUser(req,res);
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/documentSupprime
 * @desc pour rechercher un document actif par son nom
 * @access Public
 */
 router.get('/documentSupprime/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                req.RoleId = 2;
                req.etat = 'supprime';
                UserController.findOneUser(req,res);
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

module.exports = router;