const fs = require('fs');
const path = require('path');
const db = require('../database/models');

function authUserLogin(req,res,next){
    if(req.session.userLoginSession == undefined){
        if(req.cookies.user){
            db.Users.findByPk(req.cookies.user)
            .then(function(user){
            req.session.userLoginSession=user;
            next();
            });
        }else{
            return res.redirect('/users/login');
        }
    }
    next();
}

module.exports=authUserLogin;