const { check, validationResult, body } = require('express-validator');

module.exports = [
    check('password').isLength({min:5}).withMessage('Contraseña como minimo 5 caracteres'),
    check('email').isEmail().withMessage('Correo incorrecto'),
    check('currentEmail').isEmail().withMessage('Correo incorrecto')
];