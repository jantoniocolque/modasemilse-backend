const db = require('../database/models');

async function authUserLogin(req,res,next){
    if(req.session.userLoginSession == undefined){
        if(req.cookies.user){
            let user = await db.User.findByPk(req.cookies.user)
            req.session.userLoginSession=user.dataValues;
            next();
        }else{
            return res.redirect('/users/login');
        }
    }else{
        next();
    }
}

module.exports = authUserLogin;