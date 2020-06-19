function guestUserLogin(req,res,next){
    if(req.session.userLoginSession != undefined){
        if(req.cookies.user){
            return res.redirect('/users/account');
        }
        return res.redirect('/users/account');
    }
    next();
}

module.exports=guestUserLogin;