const { Permission, Role, PermissionRole } = require("../models");

/*
const Helper = checkPermission(roleId, permName) {
        }
    }
}
*/
let authorized = false;
exports.checkPermission = (roleId, permName) => {
    if(!roleId) {
        throw new Error('pas de role')
    }
    return new Promise((resolve, reject) => {
        Permission.findOne({
            where: {
                nom: permName
            }
        }).then(permission => {
            if(!permission) {
                throw new Error('pas de permission')
            }else {
                PermissionRole.findOne({
                    where: {
                        roleId: roleId,
                        permissionId: permission.id
                    }
                }).then((rolePermission) => {
                    if(!rolePermission) throw new Error("role and permisson  doesn t match")
                    if(rolePermission) {
                        resolve(rolePermission)
                    }else {
                        reject({ msg: 'forbidden'})
                    }
                }).catch(() => {
                    reject({ msg: 'forbidden'})
                })
            }
        })
    });
};


/*
exports.checkPermission = (roleId, permName) => {
    return new Promise((resolve, reject) => {
        await Permission.findOne({
            where: {
                nom: permName
            }
        }).then(permission => {
            await PermissionRole.findOne({
                where: {
                    roleId: roleId,
                    permissionId: permission.id
                }
            }).then((rolePermission) => {
                console.log(rolePermission)
                if(rolePermission) {
                    resolve(rolePermission)
                }else {
                    reject({ msg: 'forbidden'})
                }
            }).catch(() => {
                reject({ msg: 'forbidden'})
            })
        });
    });
};*/