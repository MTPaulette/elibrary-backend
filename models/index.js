/*
const db = require("../config/connectionDB");
const Sequelize = require("sequelize");

const connectDB = new Sequelize(db.database, db.user, db.password, {
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

module.exports = connectDB;

*/

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
    Admin : require('./Admin')(sequelize,Sequelize),
    Correction : require('./Correction')(sequelize,Sequelize),
    Cours : require('./Cours')(sequelize,Sequelize),
    Domaine : require('./Domaine')(sequelize,Sequelize),
    Enseignant : require('./Enseignant')(sequelize,Sequelize),
    Etudiant : require('./Etudiant')(sequelize,Sequelize),
    Epreuve : require('./Epreuve')(sequelize,Sequelize),
    Faculte : require('./Faculte')(sequelize,Sequelize),
    Filiere : require('./Filiere')(sequelize,Sequelize),
    Livre : require('./Livre')(sequelize,Sequelize),
    Niveau : require('./Niveau')(sequelize,Sequelize),
    Notification : require('./Notification')(sequelize,Sequelize),
    Requete : require('./Requete')(sequelize,Sequelize),
    Signalement : require('./Requete')(sequelize,Sequelize),
    Specialite : require('./Specialite')(sequelize,Sequelize),
    Td : require('./Td')(sequelize,Sequelize),
    Ue : require('./Ue')(sequelize,Sequelize),
};

/**
 * module admin
 */

//admin cree un ou n enseignant
myModels.Admin.hasMany(myModels.Enseignant);
myModels.Enseignant.belongsTo(myModels.Admin);

//admin ajoute un ou n domain
myModels.Admin.hasMany(myModels.Domaine, { foreignKey: {name:'idAdminAjouteur'}});
myModels.Domaine.belongsTo(myModels.Admin);

//admin bloque un ou n etudiant
myModels.Admin.hasMany(myModels.Etudiant, { foreignKey: {name:'idAdminBloqueur'}});
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


/**
 * module etudiant
 */

//etudiant aime et recevoir n ou n domaine
myModels.Etudiant.belongsToMany(myModels.Livre, {through: 'domaineEtudiant'});
myModels.Livre.belongsToMany(myModels.Etudiant, {through: 'domaineEtudiant'});

//etudiant aime n ou n domaine
myModels.Etudiant.belongsToMany(myModels.Notification, {through: 'etudiantNotification'});
myModels.Notification.belongsToMany(myModels.Etudiant, {through: 'etudiantNotification'});

//etudiant publie un ou n livre
myModels.Etudiant.hasMany(myModels.Livre, { foreignKey: {name:'idEtudiantPublieur'}});
myModels.Livre.belongsTo(myModels.Etudiant);

//etudiant supprime un ou n livre
myModels.Etudiant.hasMany(myModels.Livre, { foreignKey: {name:'idEtudiantSupprimeur'}});
myModels.Livre.belongsTo(myModels.Etudiant);

//etudiant envoie un ou n signalement
myModels.Etudiant.hasMany(myModels.Signalement, { foreignKey: {allowNull: false}});
myModels.Signalement.belongsTo(myModels.Etudiant);

//etudiant envoie un ou n signalement
myModels.Etudiant.hasMany(myModels.Signalement, { foreignKey: {allowNull: false}});
myModels.Signalement.belongsTo(myModels.Etudiant);

//etudiant envoie un ou n requete
myModels.Etudiant.hasMany(myModels.Requete);
myModels.Requete.belongsTo(myModels.Etudiant);


/**
 * module enseignant
 */

//enseignant ajoute un ou n domaine
myModels.Enseignant.hasMany(myModels.Domaine, { foreignKey: {name:'idEnseignantAjouteur'}});
myModels.Domaine.belongsTo(myModels.Enseignant)

//enseignant publie un ou n cours
myModels.Enseignant.hasMany(myModels.Cours, { foreignKey: {name:'idEnseignantPublieur'}});
myModels.Cours.belongsTo(myModels.Enseignant)

//enseignant supprimer un ou n cours
myModels.Enseignant.hasMany(myModels.Cours, { foreignKey: {name:'idEnseignantSupprimeur'}});
myModels.Cours.belongsTo(myModels.Enseignant)

//enseignant publie un ou n td
myModels.Enseignant.hasMany(myModels.Td, { foreignKey: {name:'idEnseignantPublieur'}});
myModels.Td.belongsTo(myModels.Enseignant)

//enseignant supprimer un ou n td
myModels.Enseignant.hasMany(myModels.Td, { foreignKey: {name:'idEnseignantSupprimeur'}});
myModels.Td.belongsTo(myModels.Enseignant)

//enseignant publie un ou n epreuve
myModels.Enseignant.hasMany(myModels.Epreuve, { foreignKey: {name:'idEnseignantPublieur'}});
myModels.Epreuve.belongsTo(myModels.Enseignant)

//enseignant supprimer un ou n epreuve
myModels.Enseignant.hasMany(myModels.Epreuve, { foreignKey: {name:'idEnseignantSupprimeur'}});
myModels.Epreuve.belongsTo(myModels.Enseignant)

//enseignant publie un ou n correction
myModels.Enseignant.hasMany(myModels.Correction, { foreignKey: {name:'idEnseignantPublieur'}});
myModels.Correction.belongsTo(myModels.Enseignant)

//enseignant supprimer un ou n Correction
myModels.Enseignant.hasMany(myModels.Correction, { foreignKey: {name:'idEnseignantSupprimeur'}});
myModels.Correction.belongsTo(myModels.Enseignant)

//td a un ou n Correction
myModels.Td.hasMany(myModels.Correction);
myModels.Correction.belongsTo(myModels.Td)

//epreuve a un ou n Correction
myModels.Epreuve.hasMany(myModels.Correction);
myModels.Correction.belongsTo(myModels.Epreuve)

//faculte a un ou n etudiant
myModels.Faculte.hasMany(myModels.Etudiant);
myModels.Etudiant.belongsTo(myModels.Faculte);

//Filiere a un ou n cours
myModels.Filiere.hasMany(myModels.Etudiant);
myModels.Etudiant.belongsTo(myModels.Filiere);

//niveau a un ou n cours
myModels.Niveau.hasMany(myModels.Etudiant);
myModels.Etudiant.belongsTo(myModels.Niveau);

//specialite a un ou n cours
myModels.Specialite.hasMany(myModels.Etudiant);
myModels.Etudiant.belongsTo(myModels.Specialite);


/**
 * module document
 */

//Cours a n ou n domaine
myModels.Cours.belongsToMany(myModels.Domaine, {through: 'coursDomaine'});
myModels.Domaine.belongsToMany(myModels.Cours, {through: 'coursDomaine'});

//livre a n ou n domaine
myModels.Livre.belongsToMany(myModels.Domaine, {through: 'domaineLivre'});
myModels.Domaine.belongsToMany(myModels.Livre, {through: 'domaineLivre'});

//livre envoie un ou n signalement
myModels.Livre.hasMany(myModels.Signalement, { foreignKey: {allowNull: false}});
myModels.Signalement.belongsTo(myModels.Livre);

/**
 * module faculte , filiere, specialite
 */

//faculte a un ou n cours
myModels.Faculte.hasMany(myModels.Cours);
myModels.Cours.belongsTo(myModels.Faculte);

//Filiere a un ou n cours
myModels.Filiere.hasMany(myModels.Cours);
myModels.Cours.belongsTo(myModels.Filiere);

//niveau a un ou n cours
myModels.Niveau.hasMany(myModels.Cours);
myModels.Cours.belongsTo(myModels.Niveau);

//specialite a un ou n cours
myModels.Specialite.hasMany(myModels.Cours);
myModels.Cours.belongsTo(myModels.Specialite);

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


//myModels.User.belongsToMany(myModels.Document, {through: 'C'});
//myModels.Document.belongsToMany(myModels.User, {through: 'C'});

module.exports = myModels;

 