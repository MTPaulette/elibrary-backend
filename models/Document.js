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
        resume: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        auteur: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: true,
    });
    return Document;
};

