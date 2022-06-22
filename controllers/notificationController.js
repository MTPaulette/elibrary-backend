const { Notification, User, Filiere } = require("../models/index");

const { Op } = require("sequelize");
/**
 * =========================================================== gestion des utilisateurs ======================================================
 */

//ajouter un nouvel notification
exports.create = async (req, res) => {
    let { contenu, FiliereId } = req.body;

    //the data is valid and now we can register the admin
    let newNotification= {
        contenu
    };

    if(FiliereId) {
        newNotification.FiliereId = FiliereId
    }
    Notification.create(newNotification).then(notification => {
        if(notification) {if(req.user) {
            notification.setUser(req.user);
        }

            global.io.to(FiliereId).emit('NEW_NOTIFICATION', notification);
            return res.status(201).json({
                success: true,
                msg: "notification registred successfully",
                notification: notification
            });

        }else {
            return res.status(500).json({
                success: false,
                msg: "nsomething wrong",
                notification: notification
            });

        }
    });
  //});
};


//recuperer tous les notifications de la bd
exports.findAll = (req, res) => {
    if (req.user.RoleId == 1) {
        Notification.findAll({
            include: [User, Filiere]
        }).then(notifications => {
            return res.status(201).json({
                success: true,
                msg: "toutes les notifications",
                notifications
            });
        });
    } else {
        Notification.findAll({
            where: {
            [Op.or]: [
                {
                FiliereId : null,
                },
                {
                FiliereId : req.user.FiliereId,
                },
            ],
            },
            include: [User, Filiere]
        }).then(notifications => {
            return res.status(201).json({
                success: true,
                msg: "toutes les notifications",
                notifications
            });
        });
        
    }
};

/**================================================================================================================================================ */
