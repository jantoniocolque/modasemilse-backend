const fs = require('fs');
const path = require('path');

function authUserLogin(req,res,next){
    if(req.session.userLoginSession == undefined){
        if(req.cookies.user){
            const usersFilePath = path.join(__dirname, '../data/users.json');
            const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

            let userLogin=users.find(user => {
                return user.id==req.cookies.user;
            })

            req.session.userLoginSession=userLogin;
            next();
        }else{
            return res.redirect('/users/login');
        }
    }
    next();
}

module.exports=authUserLogin;