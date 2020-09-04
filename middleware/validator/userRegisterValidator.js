const { check, validationResult, body } = require('express-validator');

const db = require('../../database/models');

module.exports = [
    check('firstName').isLength({min:2}).withMessage('Debe tener minimo 2 caracteres'),
    check('lastName').isLength({min:2}).withMessage('Debe tener minimo 2 caracteres'),
    check('password').isLength({min:8}).withMessage('Contraseña como minimo 8 caracteres'),
    check('email').isEmail().withMessage('Correo incorrecto'),
    body('email').custom(async function(value){
      const usuario = await db.User.findOne({where : {email:value}});
        if(usuario !=  null){
          
          return Promise.reject();
        }
    }).withMessage('Usuario ya existente'),
];