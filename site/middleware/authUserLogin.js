const db = require('../database/models');

function authUserLogin(req,res,next){
    if(req.session.userLoginSession == undefined){
        if(req.cookies.user){
            db.User.findByPk(req.cookies.user)
            .then(function(user){
                req.session.userLoginSession = user.dataValues;
                next();
        }else{
            return res.redirect('/users/login');
        }
    }else{
        next();
    }
}

module.exports = authUserLogin;