const AuthRouter = require('express').Router();
const signupValidator = require('../validator/auth/signupValidator');
const loginValidator = require('../validator/auth/loginValidator');

const {
    signUp,
    signIn,
    logOut,
} = require('../controller/authController');

AuthRouter.post('/signup',signupValidator, signUp);
AuthRouter.post('/signin',loginValidator, signIn);
AuthRouter.get('/logout', logOut);



module.exports = AuthRouter;