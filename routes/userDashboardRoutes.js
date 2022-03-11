const userDashboardRoute = require('express').Router();
const profilevalidator = require('../validator/authencation/profileValidator');
const uploadFile = require('../middleware/uploadFile');
const hostFile = require('../middleware/hostFile');
const { createProfile } = require('../controller/userDashboardController');

userDashboardRoute.post(
    '/create-profile',
    uploadFile.single('profilePic'),
    profilevalidator,
    createProfile,
);

module.exports = userDashboardRoute;
