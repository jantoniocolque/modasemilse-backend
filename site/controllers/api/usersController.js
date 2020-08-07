const jwt = require('jsonwebtoken');
const Op = require('Sequelize').Op;
const bcrypt = require('bcrypt');
let db = require('../../database/models');

const controller = {
    login: async (req,res) =>{
        let userLogin = await db.User.findOne({ where: { email : req.body.email } });
        if(userLogin !=undefined){
            console.log(req.body.password);
            if(bcrypt.compareSync(req.body.password,userLogin.password)){
                const payload = {
                    email: req.body.email
                };
                return jwt.sign(payload, "secret", {
                    expiresIn: 3600
                }, 
                (err, token) => {
                    if (err) {
                        return res.json({
                            mensaje: err
                        })
                    }
                    res.status(200).json({
                        token: token,
                    });
                });
            }
            else{
                res.json('Usuario o contraseña incorrecta');
            }
        }
        else{
            res.json('Usuario o contraseña incorrecta');
        }
    },
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
    },
    find: async (req,res) => {
        const user = await db.User.findByPk(req.params.id);
        if(user.rol_id == 1){
            res.json("No existe ese usuario");
        }

        res.json(user);
    }
}

module.exports = controller;