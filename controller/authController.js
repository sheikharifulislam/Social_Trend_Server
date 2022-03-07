const User = require('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const errorFormatter = require('../utlis/validationErrorFormatter');


const sendMail = require('../utlis/sendEmail');
const acountVerifyTemplate = require('../utlis/acountVerifyTemplate');

exports.signUp = async(req, res) => {
    try{       
        const errors = validationResult(req).formatWith(errorFormatter);
        if(!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.mapped()
            })
        } 
        const {password} = req.body;      
        const hashPassword = await bcrypt.hash(password, 15);
        const user = new User({
           ...req.body,
           password: hashPassword,
        });       
       await user.save();
       const acountVerifytoken = jwt.sign({
            userId: user._id,                       
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: process.env.EMAIL_VERIFY_JWT_EXPIRY,
        })
        res.cookie(process.env.SOCIAL_TREND_EMAIL_VERIFY, `Bearer ${acountVerifytoken}`, {            
            httpOnly: true,
            signed: true,
        });       
       const template = await acountVerifyTemplate(user,acountVerifytoken);       
       sendMail(user.email,'Acount Verification',template);
       res.status(201).json({
            message: 'Please Check Your Email Address And Verify Your Email Address',
        })
    }
    catch(error) {
        res.status(501).json(error.message);        
    }
}

exports.signIn = async(req, res) => {
    try{
        const errors = validationResult(req).formatWith(errorFormatter);
        if(!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.mapped(),
            })
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user._id) {
            if(user.isVerified === false ) {
                const isPasswordMatch = await bcrypt.compare(password, user.password);
                if(isPasswordMatch) {

                    //create new user object
                    const userObject = {
                        userId: user._id,
                        userName: user.userName,
                        email: user.email, 
                    }

                    //generate token
                    const token = jwt.sign({
                        userId: user._id,
                        userName: user.userName,
                        email: user.email,
                    }, process.env.JWT_SECRET_KEY, {
                        expiresIn: process.env.JWT_EXPIRY,
                    })

                    //set cookie
                    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
                        maxAge: process.env.JWT_EXPIRY,
                        httpOnly: true,
                        signed: true,
                    });               
                
                    res.status(200).json(userObject);
                }
                else {
                    res.status(401).json({
                        message: 'Email or Password Invaild',
                    })
                }
            }
        }
        else {
            res.status(401).json({
                message: 'Email or Password Invaild',
            })
        }
    }
    catch(error) {
        console.log(error.message);        
    }
}

exports.logOut = async(req, res) => {
    try{
        res.clearCookie(process.env.COOKIE_NAME);
        res.status(200).json({
            message: 'successfully log out',
        })
    }
    catch(error) {
        console.log(error.message);
    }
}