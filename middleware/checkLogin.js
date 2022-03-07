const jwt = require('jsonwebtoken');
exports.checkLogin = (req,res,next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;   
    
    if(cookies) {
        try{               
            const token = cookies[process.env.COOKIE_NAME].split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            res.user = decoded;  
            next();
        }
        catch(err) {
           res.status(500).json({
               message: err.message,
           })
        }
    }
    else {
        res.status(401).json({
            message: 'Authentication failed',
        })
    }
}
