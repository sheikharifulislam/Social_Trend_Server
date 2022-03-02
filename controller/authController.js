const User = require('../model/UserModel');
const bcrypt = require('bcrypt');

exports.signUp = async(req, res) => {
    try{
       const {name, email, password,birthday,gander} = req.body;
        const hashPassword = await bcrypt.hash(password, 15);
       const user = new User({
        name,
        email,
        password: hashPassword,
        birthday,
        gander,
       });
       const result = await user.save();
       res.status(201).json({
           insertId: result._id,
       });
    }
    catch(error) {
        res.status(500).json(error.message);
    }
}

exports.signIn = async(req, res) => {
    try{
        console.log(req.body);
    }
    catch(error) {
        console.log(error.message);
    }
}

exports.logOut = async(req, res) => {
    try{
        console.log(req.body);
    }
    catch(error) {
        console.log(error.message);
    }
}