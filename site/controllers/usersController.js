const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt');
var { check, validationResult, body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
    register : function(req, res) {
        res.render('register', { title: 'Modas Emilse | Registro' });
    },
    login : function(req, res){
        res.render('login', { title: 'Modas Emilse | Login' })
    },
    userValidator : function(req, res){
        const errors=validationResult(req);
        if(errors.isEmpty()){
            let userLogin=users.find(user => {
                return user.email==req.body.email;
            })
            if(userLogin !=undefined){
                if(bcrypt.compareSync(req.body.password,userLogin.password)){
                    req.session.userLoginSession=userLogin;
                    if(req.body.newsletter){
                        res.cookie('user',userLogin.id,{maxAge:10000});
                    }
                    res.redirect('/users/account');
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
    create : function (req, res){
        const errors=validationResult(req);
        if(errors.isEmpty()){
            let nuevaId = users.length + 1;
            let nuevoUsuario = {
                id: nuevaId,
                avatar : req.files[0].filename,
                nombre : req.body.firstName,
                apellido : req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                nacimiento: req.body.nacimiento,
                sexo: req.body.sexo,
                newsletter: req.body.newsletter
            }

            const nuevosUsuarios = [...users, nuevoUsuario];
            fs.writeFileSync(usersFilePath, JSON.stringify(nuevosUsuarios, null, ' '));
            
            res.send('Información guardada.');
        }else{
            return res.render('register',{
                errors:errors.errors,
                title:'Modas Emilse | Login'
            })
        }
    },
    account : function(req, res){
        res.render('userPanel', {
            title: 'Modas Emilse | Mi cuenta',
            nombre:req.session.userLoginSession.nombre,
            apellido:req.session.userLoginSession.apellido,
            email:req.session.userLoginSession.email
        });
    },
    orders : function(req, res){
        res.render('userOrders', { title: 'Modas Emilse | Mis pedidos' });
    },
    favorites:function(req, res){
        res.render('userFavorites', { title: 'Modas Emilse | Favoritos' });
    }
    
}

module.exports = usersController;