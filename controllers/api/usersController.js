const jwt = require('jsonwebtoken');
const {Op}= require('sequelize');
const bcrypt = require('bcrypt');
let db = require('../../database/models');

const controller = {
    login: async (req,res) =>{
        console.log(req.body);
        let userLogin = await db.User.findOne({ where: {email: req.body.email }});
        
        if(userLogin !=undefined){
            if(userLogin.rol_id == 1){
                if(req.body.password == userLogin.password){
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
                res.json("No tiene autorizacion para ingresar");
            }
            
        }
        else{
            res.json('Usuario o contraseña incorrecta');
        }
    },
    list: async (req,res) => {
        let data = [];
        const rol = await db.Rol.findOne({where:{name_rol:{[Op.or]:["USER","usuario"]}}});
        const users = await db.User.findAll({
            where: {
                rol_id:rol.id
            }
        });
        for (let i=0; i<users.length; i++){
            data[i] = {
                id : users[i].id,
                name : users[i].nombre,
                email : users[i].email,
                detail : "https://modasemilse.herokuapp.com/v1/users/" + users[i].id
            }
        }
        

        const respuesta = {
            meta:{
                status:200,
                total: users.length,
            },
            data:data,
        }

        res.json(respuesta);
    },
    find: async (req,res) => {
        const user = await db.User.findByPk(req.params.id);
        if(user.rol_id == 1){
            res.json("No existe ese usuario");
        }

        let respuesta = {
            id : user.id,
            nombre : user.nombre,
            apellido : user.apellido,
            email : user.email,
            nacimiento : user.nacimiento,
            sexo : user.sexo,
        }

        res.json(respuesta);
    }
}

module.exports = controller;