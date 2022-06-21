// utils
//import makeValidation from '@withvoid/make-validation';

const { User, Requete, Message } = require("./../../models/index");
//let io = require("./../../io")

const { Op } = require("sequelize");
exports.postMessage = async (req, res) => {
  try {
    
    const requeteId = req.params.requeteId;
    const contenu = req.body.contenu;

    let message = {
        contenu
    };

    Message.create(message).then(message => {
      message.setUser(req.user);
      message.setRequete(requeteId);
      global.io.emit('NEW_MESSAGE', message);
      return res.status(201).json({
        success: true,
        msg: "message registred successfully",
        //message: message
      });
    });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
},

//find all recent request conversation
exports.getRecentConversation = async (req, res) => {  
    //check for the unique id
    const requetes = await Requete.findAll({
        where: {
            UserSenderId: req.user.id
        },
      //include: [{ model: User, as: 'UserReceiver' }]

        include: { all:true }
        //include: [ UserSender, UserReceiver]
    });
  if (requetes) {
      //global.io.emit('ALL_REQUETE', { requetes: allRequete })
      //global.io.emit('ALL_REQUETE', requetes )
        return res.status(201).json({
            success: true,
            requetes
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
  },

//get all messages of the request using the requeteId
exports.getMessagesByRequeteId = async (req, res) => {
    const messages = await Message.findAll({
        where: {
            RequeteId: req.params.requeteId
        },
        //include: [User]
    })
    if (messages) {
        return res.status(201).json({
            success: true,
            messages
        });
    } else {
        return res.status(500).json({
            success: false
        });
    }
  },
exports.markConversationReadByRequeteId = async (req, res) => {
    try {
      const { requeteId } = req.params;
      const room = await Requete.getRequeteByRequeteId(requeteId)
      if (!room) {
        return res.status(400).json({
          success: false,
          message: 'No room exists for this id',
        })
      }

      const currentLoggedUser = req.userId;
      const result = await Message.markMessageRead(requeteId, currentLoggedUser);
      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error });
    }
  }
