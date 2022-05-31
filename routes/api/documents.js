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
 * @route post api/users/ajouterenseignant
 * @desc pour permettre la creation des cmptes enseignants par l'admin
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

                
               /* (upload.single('myFile'), async (req, res) => {
                    return res.json({
                        success: false,
                        msg: 'fichier uploade',
                        document: req.file
                    });
                    DocumentController.createDocument(req,res)
                });
                */
                
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
 * @route get api/users/bloquerenseignant
 * @desc pour permettre le blocage des comptes enseignants par l'admin
 * @access Public
 */
 router.get('/bloquerDocument/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'bloquer_user').then(rolePerm => {
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


module.exports = router;