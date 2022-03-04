const User = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const errorFormatter = require('../utlis/validationErrorFormatter');

exports.signUp = async(req, res) => {
    try{       
        const errors = validationResult(req).formatWith(errorFormatter);
        if(!errors.isEmpty()) {
            return res.status(401).json(errors.mapped())
        } 
        const {password} = req.body;      
        const hashPassword = await bcrypt.hash(password, 15);
       const user = new User({
           ...req.body,
           password: hashPassword,
        });       
       await user.save();
       res.status(201).json({
            insertId: user._id,
        })
    }
    catch(error) {
        res.status(501).json(error.message);        
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
            return res.status(401).json({
                message: 'Email or Password Invaild',
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(isPasswordMatch) {
            //generate token
           const token = jwt.sign({
               userId: user._id,
               userName: user.userName,
           }, process.env.JWT_SECRET_KEY, {
               expiresIn: '1h',
           })
           
           res.status(200).json({
               accessToken: `Bearer ${token}`,
               message: 'Login Successful',
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