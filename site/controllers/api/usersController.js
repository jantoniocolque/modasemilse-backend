const Op = require('Sequelize').Op;
let db = require('../../database/models');

const controller = {
    list: async (req,res) => {
        const rol = await db.Rol.findOne({where:{name_rol:{[Op.or]:["USER","usuario"]}}});
        const users = await db.User.findAll({
            where: {
                rol_id:rol.id
            }
        });
        for( let i=0; i<users.length;i++){
            users[i].setDataValue("endpoints","https://localhost/api/users/"+users[i].id);
        }

        const respuesta = {
            meta:{
                status:200,
                total: users.length,
            },
            data:users,
        }
        res.json(respuesta);
    }
}

module.exports = controller;