const jwt = require('jsonwebtoken');

const autenticacion = (req, res, next) => {
    const token = req.header('token');
    try {
        const user = jwt.verify(token, "secret");
        next();
    } catch (e) {
        res.json({
            mensaje: 'Token incorrecto'
        });
    }
};

module.exports = autenticacion;