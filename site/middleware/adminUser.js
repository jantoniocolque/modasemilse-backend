const db = require('../database/models');

async function adminUser(req,res,next){
    
    if(req.session.userLoginSession != undefined){
        const rol = await db.Rol.findOne({where:{id : req.session.userLoginSession.rol_id}});
        if(rol.name_rol == 'administrador' || rol.name_rol == 'ADMIN')
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