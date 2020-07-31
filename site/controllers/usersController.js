let bcrypt = require('bcrypt');
var {check, validationResult, body} = require('express-validator');
const Op = require('Sequelize').Op;
/* Se requieren los modelos de la base de datos */
let db = require('../database/models');

let usersController = {
    register : function(req, res) {
        res.render('register', { title: 'Modas Emilse | Registro',session:req.session.userLoginSession});
    },
    login : function(req, res){
        res.render('login', { title: 'Modas Emilse | Login',session:req.session.userLoginSession});
    },
    userValidator : async (req, res,next) => {
        const errors=validationResult(req);
        if(errors.isEmpty()){
            let userLogin = await db.User.findOne({ where: { email : req.body.email } });
           
            if(userLogin !=undefined){
                if(bcrypt.compareSync(req.body.password,userLogin.password) || userLogin.password == req.body.password){
                    req.session.userLoginSession = userLogin.dataValues;
                    if(req.body.remember != undefined){
                        res.cookie('user',userLogin.dataValues.id,{maxAge:60000});
                    }
                    if(userLogin.rol_id==1){
                        res.redirect('/users/account/update');
                    }
                    res.redirect('/users/account');
                }
                else{
                    res.render('login',{
                        title:'Modas Emilse | Login',
                        error:'Usuario o contraseña incorrecta'
                    });
                }
            }else{
                res.render('login',{
                    title:'Modas Emilse | Login',
                    error:'Usuario o contraseña incorrecta'
                });
            }
        }else{
            res.render('login',{
                title:'Modas Emilse | Login',
                errors:errors.errors
            });
        }
    },
    create :async function (req, res){
        const errors=validationResult(req);
        if(errors.isEmpty()){
            const roles = await db.Rol.findOne({
                where:{
                    name_rol:{
                        [Op.or]:['USER','usuario']
                    }
                }
            });
            db.User.create({
                avatar : req.files[0].filename,
                nombre : req.body.firstName,
                apellido : req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                nacimiento: req.body.nacimiento,
                sexo: req.body.sexo,
                newsletter: req.body.newsletter,
                rol_id:roles.id,
            });
            
            res.redirect('/users/login');
        }else{
            return res.render('register',{
                errors:errors.errors,
                title:'Modas Emilse | Registro'
            })
        }
    },
    update : function(req, res){
        res.render('userUpdate', {
            title: 'Modas Emilse | Mi cuenta',
            user: req.session.userLoginSession, errors : "yes",
            session:req.session.userLoginSession
        });
    },
    storeUpdate : function(req, res){
        db.User.update({
            avatar : req.files[0].filename,
            nombre : req.body.firstName,
            apellido : req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            nacimiento: req.body.nacimiento,
            sexo: req.body.sexo,
            newsletter: req.body.newsletter
        }, {
            where : {
                email : req.body.currentEmail
            }
        });

        req.session.destroy();
        res.cookie('color',null,{maxAge:-1});
        
        res.redirect('/users/login');
    },
    account : function(req, res){
        res.render('userPanel', {
            title: 'Modas Emilse | Mi cuenta',
            nombre:req.session.userLoginSession.nombre,
            apellido:req.session.userLoginSession.apellido,
            email:req.session.userLoginSession.email,
            session:req.session.userLoginSession
        });
    },
    orders : function(req, res){
        res.render('userOrders', { 
            title: 'Modas Emilse | Mis pedidos',
            nombre:req.session.userLoginSession.nombre,
            apellido:req.session.userLoginSession.apellido,
            session:req.session.userLoginSession
        });
    },
    favorites:function(req, res){
        res.render('userFavorites', { title: 'Modas Emilse | Favoritos',session:req.session.userLoginSession});
    },
    logout:function(req, res) {
        req.session.destroy();
        res.cookie('color',null,{maxAge:-1});
        res.redirect('/users/login');
    }
}

module.exports = usersController;