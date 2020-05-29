const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt');
var { check, validationResult, body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
    'register' : function(req, res) {
        res.render('register', { title: 'Modas Emilse | Registro' });
    },
    login : function(req, res){
        res.render('login', { title: 'Modas Emilse | Login' })
    },
    userValidator : function(req, res){
        res.redirect('/');
    },
    create : function (req, res){
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
    }
}

module.exports = usersController;