const db = require('../database/models');

function authUserLogin(req,res,next){
    if(req.session.userLoginSession == undefined){
        if(req.cookies.user){
            db.User.findByPk(req.cookies.user)
            .then(function(user){
                req.session.userLoginSession = user.dataValues;
                next();
            });
        }else{
            return res.redirect('/users/login');
        }
    }else{
        next();
    }
<<<<<<< HEAD
}
module.exports = authUserLogin;
=======
    }
module.exports = authUserLogin;
>>>>>>> 804d57c2b27df8081e1facb0ddfacb152f1d34a7
