let bcrypt = require('bcrypt');
const db = require('../database/models');

function adminUser(req,res,next){
    
    if(req.session.userLoginSession != undefined){
        if(req.session.userLoginSession.rol_id == 1)
        {
            next();
        }
        else{
            return res.redirect('/products');
        }
    }
    else{
        return res.redirect('/users/login');
    }
}

module.exports = adminUser;