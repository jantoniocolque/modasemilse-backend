function guestUserLogin(req,res,next){
    if(req.session.userLoginSession != undefined){
        return res.redirect('/users/account');
    }
    next();
}

module.exports = guestUserLogin;