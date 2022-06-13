module.exports = (sequelize,Sequelize) => {
    const Document = sequelize.define('Document', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        contenu: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        resume: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        etat: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: 'actif'
        },
        nbTelechargement: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        auteur: {
            type: Sequelize.STRING,
            allowNull: true
        },
    },
    {
        timestamps: true,
    });
    return Document;
};

