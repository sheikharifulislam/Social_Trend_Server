const jwt = require('jsonwebtoken');
exports.checkLogin = (req,res,next) => {
    const {authorization} = req.headers;
    try{
        console.log(authorization)
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const {userId, userName} = decoded;
        req.userId = userId;
        req.userName = userName;
        next();
    }
    catch(err) {
        console.log(err)
        next("Authentication failure");
    }
}