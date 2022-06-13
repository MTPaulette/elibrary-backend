module.exports = (sequelize,Sequelize) => {
    const Epreuve = sequelize.define('Epreuve', {
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
        objectif: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        etat: {
            type: Sequelize.STRING,
            allowNull: true,
            default: 'actif'
        },
        nbTelechargement: {
            type: Sequelize.INTEGER,
            allowNull: true,
            default: 0,
        }
    },
    {
        timestamps: true,
    });
    return Epreuve;
};

