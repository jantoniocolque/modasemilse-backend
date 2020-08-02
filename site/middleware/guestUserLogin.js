function guestUserLogin(req,res,next){
    if(req.session.userLoginSession != undefined || req.cookies.user != undefined){
        return res.redirect('/users/account');
    }
    next();
}

module.exports = guestUserLogin;