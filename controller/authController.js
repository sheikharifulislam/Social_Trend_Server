const User = require('../model/UserModel');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const errorFormatter = require('../utlis/validationErrorFormatter');

exports.signUp = async(req, res) => {
    try{       
        const errors = validationResult(req).formatWith(errorFormatter);
        if(!errors.isEmpty()) {
            return res.status(401).json(errors.mapped())
        }
       const {userName, email, password,birthday,gander} = req.body;
        const hashPassword = await bcrypt.hash(password, 15);
       const user = new User({
        userName,
        email,
        password: hashPassword,
        birthday,
        gander,       
       });
       const result = await user.save();
       res.status(201).json({
           insertId: result._id,          
       });
      
    }
    catch(error) {
        res.status(501).json(error.message);
        console.log(error);        
    }
}

exports.signIn = async(req, res, next) => {
    try{
        const errors = validationResult(req).formatWith(errorFormatter);
        if(!errors.isEmpty()) {
            return res.status(401).json(errors.mapped())
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({
                message: 'Email or Password Invaild',
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((error) => {
                if(error) {
                    console.log(error);
                    return next(error);
                }
                res.status(200).json(user);
            })
                 
        }
        else {
            res.status(401).json({
                message: 'Email or Password Invaild',
            })
        }
    }
    catch(error) {
        console.log(error.message);
        next(error);
    }
}

exports.logOut = async(req, res, next) => {
    try{
        req.session.destroy((error) => {
            if(error) {
                console.log(error);
                return next(error);
            }
            // return res.redirect('https://web.programming-hero.com/');
            return res.status(200).json({
                message: 'success',
            })
        });
    }
    catch(error) {
        console.log(error.message);
    }
}