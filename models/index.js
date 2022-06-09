const db = require("../config/connectionDB");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    dialect: db.dialect,
    //operatorsAliases: false,
    pool: {
        max: db.pool.max,
        min: db.pool.min,
        acquire: db.pool.acquire,
        idle: db.pool.idle,
    }
});

const myModels = {
    sequelize : sequelize,
    key : db.key,
    /*
    Admin : require('./old/Admin')(sequelize,Sequelize),
    Correction : require('./old/Correction')(sequelize,Sequelize),
    Cours : require('./Cours')(sequelize,Sequelize),
    Enseignant : require('./Enseignant')(sequelize,Sequelize),
    Etudiant : require('./Etudiant')(sequelize,Sequelize),
    Td : require('./Td')(sequelize,Sequelize),
    Epreuve : require('./Epreuve')(sequelize,Sequelize),
    Livre : require('./old/Livre')(sequelize,Sequelize),
    */
    Document : require('./Document')(sequelize,Sequelize),
    Domaine : require('./Domaine')(sequelize,Sequelize),
    Faculte : require('./Faculte')(sequelize,Sequelize),
    Filiere : require('./Filiere')(sequelize,Sequelize),
    Niveau : require('./Niveau')(sequelize,Sequelize),
    Notification : require('./Notification')(sequelize,Sequelize),
    Requete : require('./Requete')(sequelize,Sequelize),
    Signalement : require('./Requete')(sequelize,Sequelize),
    Specialite : require('./Specialite')(sequelize,Sequelize),
    Ue : require('./Ue')(sequelize,Sequelize),
    User : require('./User')(sequelize,Sequelize),

    Type : require('./Type')(sequelize,Sequelize),
    Role : require('./Role')(sequelize,Sequelize),
    Permission : require('./Permission')(sequelize,Sequelize),
    PermissionRole : require('./PermissionRole')(sequelize,Sequelize),
};

/**
 * module admin
 */
/*
//admin cree un ou n enseignant
myModels.Admin.hasMany(myModels.Enseignant);
myModels.Enseignant.belongsTo(myModels.Admin);

//admin ajoute un ou n domain
myModels.Admin.hasMany(myModels.Domaine, { foreignKey: {name:'idAdminAjouteur'}});
myModels.Domaine.belongsTo(myModels.Admin);

//admin bloque un ou n etudiant
myModels.Admin.hasMany(myModels.Etudiant, { foreignKey: {name:'AdminBloqueurId'}});
myModels.Etudiant.belongsTo(myModels.Admin);

//admin envoye et recevoir un ou n notification
myModels.Admin.hasMany(myModels.Notification, { foreignKey: 'idAdminEnvoyeur'});
myModels.Admin.hasMany(myModels.Notification, { foreignKey: 'idAdminReceveur'});
myModels.Notification.belongsTo(myModels.Admin);

//admin bloque et debloque un ou n livre
myModels.Admin.hasMany(myModels.Livre, { foreignKey: 'idAdminEnvoyeur'});
myModels.Admin.hasMany(myModels.Livre, { foreignKey: 'idAdminReceveur'});
myModels.Livre.belongsTo(myModels.Admin);

//admin envoye et recevoir un ou n notification
myModels.Admin.hasMany(myModels.Notification, { foreignKey: 'idAdminBloqueur'});
myModels.Admin.hasMany(myModels.Notification, { foreignKey: 'idAdminDebloqueur'});
myModels.Notification.belongsTo(myModels.Admin);

//admin envoye et recevoir un ou n notification
myModels.Admin.hasMany(myModels.Notification, { foreignKey: 'idAdminBloqueur'});
myModels.Admin.hasMany(myModels.Notification, { foreignKey: 'idAdminDebloqueur'});
myModels.Notification.belongsTo(myModels.Admin);
*/

/******************************************** user et faculte, filiere, specialite*************************************************** */

//epreuve a un ou n Correction
/*
myModels.Epreuve.hasMany(myModels.Correction);
myModels.Correction.belongsTo(myModels.Epreuve)
*/
myModels.User.hasMany(myModels.User);
myModels.User.belongsTo(myModels.User)
//faculte a un ou n etudiant
myModels.Faculte.hasMany(myModels.User);
myModels.User.belongsTo(myModels.Faculte);

//Filiere a un ou n cours
myModels.Filiere.hasMany(myModels.User);
myModels.User.belongsTo(myModels.Filiere);

//niveau a un ou n cours
myModels.Niveau.hasMany(myModels.User);
myModels.User.belongsTo(myModels.Niveau);

//specialite a un ou n cours
myModels.Specialite.hasMany(myModels.User);
myModels.User.belongsTo(myModels.Specialite);

/********************************************************************************************************************************************
 * role a un ou n user
 * permission a n ou n role
 */

//role a un ou n user
myModels.Role.hasMany(myModels.User);
myModels.User.belongsTo(myModels.Role);

//role a n ou n permission
myModels.Role.belongsToMany(myModels.Permission, {through: 'PermissionRole'});
myModels.Permission.belongsToMany(myModels.Role, {through: 'PermissionRole'});

/************************************************** user et document* ************************************************************/
/* 
* role a un ou n user
* permission a n ou n role
*/

myModels.Ue.hasMany(myModels.Document);
myModels.Document.belongsTo(myModels.Ue);

myModels.User.hasMany(myModels.Document);
myModels.Document.belongsTo(myModels.User);

//role a un ou n user
myModels.Type.hasMany(myModels.Document);
myModels.Document.belongsTo(myModels.Type);

//document a n ou n domaine
myModels.Domaine.belongsToMany(myModels.Document, {through: 'DocumentDomaine'});
myModels.Document.belongsToMany(myModels.Domaine, {through: 'DocumentDomaine'});

//user aime n ou n domaine
myModels.User.hasMany(myModels.Domaine);
myModels.Domaine.belongsTo(myModels.User);



/************************************************************************************************
 * module faculte , filiere, specialite
 */

//faculte a un ou n cours
myModels.Faculte.hasMany(myModels.Document);
myModels.Document.belongsTo(myModels.Faculte);

//Filiere a un ou n cours
myModels.Filiere.hasMany(myModels.Document);
myModels.Document.belongsTo(myModels.Filiere);

//niveau a un ou n cours
myModels.Niveau.hasMany(myModels.Document);
myModels.Document.belongsTo(myModels.Niveau);

//specialite a un ou n cours
myModels.Specialite.hasMany(myModels.Document);
myModels.Document.belongsTo(myModels.Specialite);

//faculte a un ou n fliere
myModels.Faculte.hasMany(myModels.Filiere);
myModels.Filiere.belongsTo(myModels.Faculte);

//filiere a un ou n specialite
myModels.Filiere.hasMany(myModels.Specialite);
myModels.Specialite.belongsTo(myModels.Filiere);

//filiere a n ou n Niveau
myModels.Filiere.belongsToMany(myModels.Niveau, {through: 'filiereNiveau'});
myModels.Niveau.belongsToMany(myModels.Filiere, {through: 'filiereNiveau'});

//specialite a n ou n Niveau
myModels.Specialite.belongsToMany(myModels.Niveau, {through: 'filiereNiveau'});
myModels.Niveau.belongsToMany(myModels.Specialite, {through: 'filiereNiveau'});

//document recoit un ou n signalement
myModels.Document.hasMany(myModels.Signalement);
myModels.Signalement.belongsTo(myModels.Document);

module.exports = myModels;

 