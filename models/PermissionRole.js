module.exports = (sequelize,Sequelize) => {
    const PermissionRole = sequelize.define('PermissionRole', {
    },
    {
        timestamps: true,
    });
    return PermissionRole;
};

