const AuthRouter = require('express').Router();
const signupValidator = require('../validator/authencation/signupValidator');
const loginValidator = require('../validator/authencation/loginValidator');

const {
    signUp,
    signIn,
    verifyEmailAuthenticatiionLink,
    currentUser,
    logOut,
} = require('../controller/authController');

AuthRouter.post('/signup', signupValidator, signUp);
AuthRouter.post('/signin', loginValidator, signIn);
AuthRouter.get('/authentication/verify-acount', verifyEmailAuthenticatiionLink);
AuthRouter.get('/current-user', currentUser);
AuthRouter.get('/logout', logOut);

module.exports = AuthRouter;
