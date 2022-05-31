const express = require('express');
const router = express.Router();
const path = require("path");
const passport = require('passport');
const DomaineController = require('../../controllers/domaineController');
const helper = require('../../utils/helper.js');


/**
 * @route post api/users/ajouterdomaine
 * @desc pour permettre la creation des cmptes domaines par l'admin
 * @access Public
 */
 router.post('/createDomaine', passport.authenticate('jwt',{ session: false }),(req, domaine, res) => {
    try {
        helper.checkPermission(req.user.RoleId, 'add_domaine').then(rolePerm => {
            if(rolePerm){
                DomaineController.createDomaine(req, domaine, res)
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
 * @route get api/users/tousDomaines
 * @desc pour recherche tous les domaines
 * @access Public
 */

 router.get('/domaines',(req,res) => {DomaineController.findAll(req,res)});

 router.get('/domaine/:domaine',(req,res) => {DomaineController.findBydomaine(req,res)});

module.exports = router;