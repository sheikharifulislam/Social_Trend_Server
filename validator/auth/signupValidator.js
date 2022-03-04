const {body} = require('express-validator');
const User = require('../../model/UserModel');

module.exports = [
    body('userName')
        .isLength({min: 3, max: 30})
        .withMessage('Username Must Be Betwnn 2 to 30 Char')
        .trim(),

    body('email')
        .isEmail()
        .withMessage('Please Provide a Valid Email Address')
        .custom(async (email) => {
            let user = await User.findOne({email});            
            if(user) {
                return Promise.reject('Email Alredy Used');
               
            }
        })    
        .normalizeEmail(),
        
    body('password')
        .isLength({min: 8})
        .withMessage('Your Password Must Be Grater Than 8 Chars'),
    body('confirmPassword')
        .isLength({min: 8})
        .withMessage('Confrim Password Must Be Grater Than 8 Chars')
        .custom(async(confirmPassword, {req}) => {
            if(confirmPassword !== req.body.password) {
                return Promise.reject('Password And Confirm Password Not Match')
            }            
        })    
]