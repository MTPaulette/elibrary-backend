const express = require('express');
const passport = require('passport');
const router = express.Router();
const requeteController = require("../../../controllers/chat/requeteController");


//router.get('/', requeteController.getRecentConversation)
//router.get('/:requeteId', requeteController.getConversationByRequeteId)
//router.post('/initiate', requeteController.initiate)
//router.post('/:requeteId/message', requeteController.postMessage)
//router.put('/:requeteId/mark-read', requeteController.markConversationReadByRequeteId)

router.get('/', passport.authenticate('jwt', { session: false }),(req,res) => { requeteController.getRecentConversation(req, res);  });
// router.post(':requeteId/message', passport.authenticate('jwt', { session: false }), (req, res) => { requeteController.postMessage(req, res); });
router.post('/:requeteId', passport.authenticate('jwt', { session: false }), (req, res) => { requeteController.postMessage(req, res); });
router.get('/:requeteId', passport.authenticate('jwt', { session: false }), (req, res) => { requeteController.getMessagesByRequeteId(req, res); });
router.put('/:requeteId/mark-read', passport.authenticate('jwt', { session: false }), (req, res) => { requeteController.markConversationReadByRequeteId(req, res);  });

module.exports = router;
