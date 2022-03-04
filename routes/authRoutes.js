const Router = require('express').Router();
const signupValidator = require('../validator/auth/signupValidator');
const loginValidator = require('../validator/auth/loginValidator');

const {
    signUp,
    signIn,
    logOut,
} = require('../controller/authController');

Router.post('/signup',signupValidator, signUp);
Router.post('/signin',loginValidator, signIn);
Router.get('/logout', logOut);



module.exports = Router;