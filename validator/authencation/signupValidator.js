const { body } = require('express-validator');
const User = require('../../model/UserModel');

module.exports = [
    body('userName')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username Must Be Betwnn 2 to 30 Char')
        .trim(),

    body('email')
        .isEmail()
        .withMessage('Please Provide a Valid Email Address')
        .custom(async (userEmail) => {
            try {
                const user = await User.findOne({ userEmail });
                if (user) {
                    return Promise.reject(new Error('Email Alredy Used'));
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Please Provide Your  Password')
        .isStrongPassword()
        .isLength({ min: 8 })
        .withMessage('Your Password Must Be Grater Than 8 Chars'),
    body('confirmPassword')
        .not()
        .isEmpty()
        .withMessage('Please Provide Your Confirm Password')
        .isLength({ min: 8 })
        .withMessage('Confrim Password Must Be Grater Than 8 Chars')
        .custom(async (confirmPassword, { req }) => {
            try {
                if (confirmPassword !== req.body.password) {
                    return Promise.reject(new Error('Password And Confirm Password Not Match'));
                }
            } catch (err) {
                throw new Error(err.message);
            }
        }),
];
