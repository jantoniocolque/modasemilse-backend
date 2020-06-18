function guestUserLogin(req,res,next){
    console.log(req.session.userLoginSession);
    if(req.session.userLoginSession != undefined){
        if(req.cookies.user){
            return res.redirect('/users/account');
        }
        return res.redirect('/users/account');
    }
    next();
}

module.exports=guestUserLogin;