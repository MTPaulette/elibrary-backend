const { Permission, Role, PermissionRole } = require("../models");

class Helper {
    constructor() {
        checkPermission(roleId, permName) {
            return new Promise(
                (resolve, reject) => {
                    Permission.findOne({
                        where: {
                            nom: permName
                        }
                    }).then((permission) => {
                        
                        PermissionRole.findOne({
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
                }
            );
        }
    }
}