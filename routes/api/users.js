const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../../controllers/userController');
const helper = require('../../utils/helper.js')

/**
 * @route POST api/users/register
 * @desc Register the user
 * @access Public
 */
router.post('/register',(req,res) => {UserController.register(req,res)});

/**
 * @route post api/users/ajouterenseignant
 * @desc pour permettre la creation des cmptes enseignants par l'admin
 * @access Public
 */

 router.post('/ajouterEnseignant', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.register(req,res)
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
 * @route POST api/users/login
 * @desc login the user
 * @access Public
 */
router.post('/login',(req,res) => {UserController.login(req,res)});


/****************************************gestion des utilisateurs************************************* */
/**
 * @route get api/users/bloquerenseignant
 * @desc pour permettre le blocage des comptes enseignants par l'admin
 * @access Public
 */
 router.get('/bloquerUser/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'bloquer_user').then(rolePerm => {
            if(rolePerm){
                UserController.bloquerUser(req,res)
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
 * @route get api/users/debloquerEnseignant
 * @desc pour permettre le blpcage des comptes enseignants par l'admin
 * @access Public
 */

 router.get('/debloquerUser/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.debloquerUser(req,res)
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
 * @route get api/users/supprimerenseignant
 * @desc pour permettre le blpcage des comptes enseignants par l'admin
 * @access Public
 */

 router.get('/supprimerUser/:id', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'crud_enseignant').then(rolePerm => {
            if(rolePerm){
                UserController.supprimerUser(req,res)
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

/****************************************gestion de la recherche des utilisateurs************************************* */

/**
 * @route get api/users/allUser
 * @desc pour recherche tous les utilisateurs
 * @access Public
 */
router.get('/allUser', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                UserController.findAllUser(req,res)
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});


/****************************************gestion des enseignants************************************* */
/**
 * @route get api/users/tousEnseignants
 * @desc pour recherche tous les enseignants
 * @access Public
 */
 router.get('/tousEnseignants', passport.authenticate('jwt', { session: false }),(req,res) => {
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
 * @route get api/users/TousEnseignantsActifs
 * @desc pour recherche tous les enseignants actifs
 * @access Public
 */

 router.get('/TousEnseignantsActifs', passport.authenticate('jwt', { session: false }),(req,res) => {
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
 * @route get api/users/TousEnseignantsBloques
 * @desc pour recherche tous les enseignants bloqués
 * @access Public
 */
 router.get('/TousEnseignantsBloques', passport.authenticate('jwt', { session: false }),(req,res) => {
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
 * @route get api/users/TousEnseignantsSupprimes
 * @desc pour recherche tous les enseignants supprimés
 * @access Public
 */
 router.get('/TousEnseignantsSupprimes', passport.authenticate('jwt', { session: false }),(req,res) => {
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
 * @route get api/users/enseignantActif
 * @desc pour rechercher un enseignant actif par son nom
 * @access Public
 */
 router.get('/enseignantActif/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'rechercher_enseignant').then(rolePerm => {
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
 * @route get api/users/enseignantBloque
 * @desc pour rechercher un enseignant actif par son nom
 * @access Public
 */
 router.get('/enseignantBloque/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
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
 * @route get api/users/enseignantSupprime
 * @desc pour rechercher un enseignant actif par son nom
 * @access Public
 */
 router.get('/enseignantSupprime/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
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

/****************************************gestion des etudiants************************************* */
/**
 * @route get api/users/tousEtudiants
 * @desc pour recherche tous les etudiants
 * @access Public
 */
router.get('/tousEtudiants', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                const req = {
                    RoleId: 3
                }
                UserController.findAllUser(req,res)
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/TousEtudiantssActifs
 * @desc pour recherche tous les enseignants actifs
 * @access Public
 */

 router.get('/TousEtudiantsActifs', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                const req = {
                    RoleId: 3,
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
 * @route get api/users/TousEtudiantsBloques
 * @desc pour recherche tous les enseignants bloqués
 * @access Public
 */
 router.get('/TousEtudiantsBloques', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                const req = {
                    RoleId: 3,
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
 * @route get api/users/TousEtudiantsSupprimes
 * @desc pour recherche tous les enseignants supprimés
 * @access Public
 */
 router.get('/TousEtudiantsSupprimes', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                const req = {
                    RoleId: 3,
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
 * @route get api/users/etudiantActif
 * @desc pour rechercher un etudiant actif par son nom
 * @access Public
 */
 router.get('/etudiantActif/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'rechercher_etudiant').then(rolePerm => {
            if(rolePerm){
                req.RoleId = 3;
                req.etat = 'actif';
                UserController.findOneUser(req,res);
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/etudiantBloque
 * @desc pour rechercher un etudiant actif par son nom
 * @access Public
 */
 router.get('/etudiantBloque/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                req.RoleId = 3;
                req.etat = 'bloque';
                UserController.findOneUser(req,res);
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});

/**
 * @route get api/users/etudiantSupprime
 * @desc pour rechercher un etudiant actif par son nom
 * @access Public
 */
 router.get('/etudiantSupprime/:nom', passport.authenticate('jwt', { session: false }),(req,res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'touteRecherche').then(rolePerm => {
            if(rolePerm){
                req.RoleId = 3;
                req.etat = 'supprime';
                UserController.findOneUser(req,res);
            }
        } )
    } catch ( err) {
        console.log(err)
    }
});


module.exports = router;