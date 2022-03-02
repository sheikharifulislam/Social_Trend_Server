const Router = require('express').Router();

const {
    signUp,
    signIn,
    logOut,
} = require('../controller/authController');

Router.post('/signup', signUp);
Router.post('/login', signIn);
Router.post('/logout', logOut);



module.exports = Router;