const fs=require('fs');
const path=require('path');
let bcrypt = require('bcrypt');
const usersFilePath=path.join(__dirname,'../data/users.json');
const users=JSON.parse(fs.readFileSync(usersFilePath,'utf-8'));

function adminUser(req,res,next){
    if(req.session.userLoginSession){
        const userAdmin = users.find(user => {
            return user.email == req.session.userLoginSession.email;
        })
        if(userAdmin != undefined){
            if(bcrypt.compareSync(userAdmin.password,req.session.userLoginSession.password)){
                next();
            }
        }
        res.send("no es administrador");
        next();
    }
    res.redirect("/users/login");
    next();
}

module.exports = adminUser;