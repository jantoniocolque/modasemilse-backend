const { check, validationResult, body } = require('express-validator');

module.exports = [
    check('title').isLength({min:5}).withMessage('Titulo tener como minimo 5 caracteres'),
    check('description_product').isLength({min:5}).withMessage('Descripcion con 20 caracteres como minimo'),
];