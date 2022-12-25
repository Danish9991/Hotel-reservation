exports.adminauth = (req, res, next)=>{
    if(!req.session.adminLogged){
        res.redirect('/');
    } else{
        next();
    }
}