const { check, validationResult, body } = require('express-validator');

module.exports = [
    check('email').isEmail().withMessage('Formato de email incorrecto'),
    check('password').isLength({min:5}).withMessage('La contraseña debe tener al menos 5 caracteres')
  ];