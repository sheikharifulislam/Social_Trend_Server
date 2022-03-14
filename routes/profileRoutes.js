const ProfileRouter = require('express').Router();
const uploadFile = require('../middleware/uploadFile');
const hostFile = require('../middleware/hostFile');
const { updateProfile } = require('../controller/profileController');
const checkLogin = require('../middleware/checkLogin');

ProfileRouter.put('/update-profile', checkLogin, uploadFile.any(), hostFile, updateProfile);
module.exports = ProfileRouter;
