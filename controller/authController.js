const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../model/UserModel');
const errorFormatter = require('../utlis/validationErrorFormatter');
const sendMail = require('../utlis/sendEmail');
const acountVerifyTemplate = require('../utlis/acountVerifyTemplate');
const jwtTokenValidator = require('../validator/authencation/jwtTokenValidator');
const Profile = require('../model/CommentModel');

exports.signUp = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.mapped(),
            });
        }
        const { password } = req.body;
        const hashPassword = await bcrypt.hash(password, 15);
        const user = new User({
            ...req.body,
            password: hashPassword,
        });
        await user.save();
        await new Profile({
            user: user._id,
            title: '',
            bio: '',
            posts: [],
            bookmarks: [],
            friedns: [],
            friednsList: [],
        }).save();
        const acountVerifytoken = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.EMAIL_VERIFY_JWT_EXPIRY,
            },
        );
        const template = await acountVerifyTemplate(user, acountVerifytoken);
        sendMail(user.email, 'Acount Verification', template);
        res.status(201).json({
            message: 'Email verification link send. Please check you email inbox or spam folder',
        });
    } catch (error) {
        next(error);
    }
};

exports.signIn = async (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            return res.status(401).json({
                errors: errors.mapped(),
            });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                if (user.isVerified) {
                    // create new user object
                    const userObject = {
                        userId: user._id,
                        userName: user.userName,
                        email: user.email,
                        role: user.role,
                        profilePic: user.profilePic,
                    };
                    // generate token
                    const token = jwt.sign(
                        {
                            ...userObject,
                        },
                        process.env.JWT_SECRET_KEY,
                        {
                            expiresIn: process.env.JWT_EXPIRY,
                        },
                    );

                    // set cookie
                    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
                        maxAge: process.env.JWT_EXPIRY,
                        httpOnly: true,
                        signed: true,
                    });

                    res.status(200).json(userObject);
                } else {
                    res.status(401).json({
                        message:
                            'Please verify your email, check your inbox for the verification link! If you do not receive any email, please check your spam folder.',
                        isVerified: false,
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Email or Password Invaild',
                });
            }
        } else {
            res.status(401).json({
                message: 'Email or Password Invaild',
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.verifyEmailAuthenticatiionLink = async (req, res, next) => {
    try {
        const { token } = req.query;
        if (token) {
            const decoded = jwtTokenValidator(token);
            if (decoded) {
                const user = await User.findById(decoded.userId);
                if (user.isVerified) {
                    res.status(401).json({
                        message: 'User Already Verified',
                    });
                } else {
                    await User.findByIdAndUpdate(decoded.userId, {
                        $set: {
                            isVerified: true,
                        },
                    });

                    res.status(200).redirect('https://www.youtube.com/');
                }
            } else {
                res.status(401).json({
                    message: 'Innvalid Authentication url Or Token Date Expire',
                });
            }
        } else {
            res.status(401).json({
                message: 'Innvalid Authentication url Or Token Date Expire',
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.currentUser = async (req, res) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
        const token = cookies[process.env.COOKIE_NAME].split(' ')[1];
        const decoded = jwtTokenValidator(token);
        if (decoded) {
            delete decoded.iat;
            delete decoded.exp;
            res.status(200).json(decoded);
        }
    } else {
        res.status(404).json({});
    }
};

exports.logOut = async (req, res, next) => {
    try {
        res.clearCookie(process.env.COOKIE_NAME);
        res.status(200).json({
            message: 'successfully log out',
        });
    } catch (error) {
        next(error);
    }
};
