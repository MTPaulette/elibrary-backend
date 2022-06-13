const express = require('express');
const router = express.Router();
const passport = require('passport');
const AdminController = require('../../controllers/adminController');
const jwt = require('jsonwebtoken');

const checkAuth = require('../../middleware/check-auth');

/**
 * @route POST api/admins/register
 * @desc Register the admin
 * @access Public
 */
router.post('/register',(req,res) => {AdminController.create(req,res)});

/**
 * @route POST api/admins/login
 * @desc login the admin
 * @access Public
 */
router.post('/login',(req,res) => {AdminController.login(req,res)});

/**
 * =========================================================== administrer les enseignants ======================================================
 */

/**
 * @route POST api/admins/ajouterEnseignant
 * @desc ajouterEnseignant par un admin
 * @access Public
 */
router.post('/ajouterEnseignant', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.ajouterEnseignant(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});

 /**
  * @route POST api/admins/bloquerEnseignant
  * @desc bloquer un Enseignant par un admin
  * @access Public
  */

router.get('/bloquerEnseignant/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.bloquerEnseignant(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});
//router.post('/bloquerEnseignant',(req,res) => {AdminController.bloquerEnseignant(req,res)});

/**
 * @route POST api/admins/debloquerEnseignant
 * @desc debloquer un Enseignant par un admin
 * @access Public
 */

router.get('/debloquerEnseignant/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.debloquerEnseignant(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});

/**
 * @route POST api/admins/supprimerEnseignant
 * @desc supprimer un Enseignant par un admin
 * @access Public
 */

router.get('/supprimerEnseignant/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.supprimerEnseignant(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});
/**=============================================================================================================================================== */
//router.post('/check', passport.authenticate('jwt', { session: false }) ,(req,res) => {AdminController.check(req,res)});
//router.post('/check',checkAuth, (req,res) => {AdminController.check(req,res)});


/**
 * =========================================================== administrer les etudiants ======================================================
 */

router.get('/bloquerEtudiant/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.bloquerEtudiant(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});
//router.post('/bloquerEtudiant',(req,res) => {AdminController.bloquerEtudiant(req,res)});

/**
 * @route POST api/admins/debloquerEtudiant
 * @desc debloquer un Etudiant par un admin
 * @access Public
 */

router.get('/debloquerEtudiant/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.debloquerEtudiant(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});

/**=============================================================================================================================================*/

/**
 * =========================================================== administrer les livres ======================================================
 */

/**
 * @route POST api/admins/ajouterLivre
 * @desc ajouterLivre par un admin
 * @access Public
 */
 router.post('/ajouterLivre', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.ajouterLivre(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});

 /**
  * @route POST api/admins/bloquerLivre
  * @desc bloquer un Livre par un admin
  * @access Public
  */

router.get('/bloquerLivre/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.bloquerLivre(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});
//router.post('/bloquerLivre',(req,res) => {AdminController.bloquerLivre(req,res)});

/**
 * @route POST api/admins/debloquerLivre
 * @desc debloquer un Livre par un admin
 * @access Public
 */

router.get('/debloquerLivre/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.debloquerLivre(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});

/**
 * @route POST api/admins/supprimerLivre
 * @desc supprimer un Livre par un admin
 * @access Public
 */

router.get('/supprimerLivre/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const role = req.user.role;
    if (role == 'admin') {
        AdminController.supprimerLivre(req,res);
    } else {
        return res.json({
            success: false,
            msg: 'cest un utilisateur'
        });  
    }
});
/**=============================================================================================================================================*/
module.exports = router;