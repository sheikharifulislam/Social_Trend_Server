const Profile = require('../model/ProfileModel');
const User = require('../model/UserModel');

exports.updateProfile = async (req, res, next) => {
    console.log(req.files);
    res.send('well come');
};
