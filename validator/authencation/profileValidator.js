const { body } = require('express-validator');
const validator = require('validator');

const linkValidator = (value) => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error('Please Provide A Valid Url');
        }
    }
};

module.exports = [
    body('title').not().isEmpty().withMessage('Name Can Not Be Empty'),
    body('bio')
        .not()
        .isEmpty()
        .withMessage('bio Can Not Be Empty')
        .isLength({ max: 350 })
        .withMessage('Bio Can Not Be More than 350'),
    body('webSite').custom((value) => {
        linkValidator(value);
    }),
    body('faceBook').custom((value) => {
        linkValidator(value);
    }),

    body('twitter').custom((value) => {
        linkValidator(value);
    }),
    body('github').custom((value) => {
        linkValidator(value);
    }),
];
