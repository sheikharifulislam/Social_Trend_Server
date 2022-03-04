const User = require('../model/UserModel');

exports.bindUserWithRequest = () => {
    return async(req, res, next) => {
        try{
            if(req.session.isLoggedIn) {
                next();
            }
            else {
                let user =  User.findById(req.session.user._id);
                req.user = user;
                next(); 
            }
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    }
}