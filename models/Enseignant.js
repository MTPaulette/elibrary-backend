module.exports = (sequelize,Sequelize) => {
    const Enseignant = sequelize.define('Enseignant', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nom: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        etat: {
            type: Sequelize.STRING,
            allowNull: false,
            default: 'actif'
        }
    },
    {
        timestamps: true,
    });
    return Enseignant;
};

