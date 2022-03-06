const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
exports.checkLogin = (req,res,next) => {  
    
    try{
        const cookies = req.signedCookies;        
        const token = cookies[process.env.COOKIE_NAME].split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decoded);  
        next();
    }
    catch(err) {
        console.log(err.message);
    }
}
