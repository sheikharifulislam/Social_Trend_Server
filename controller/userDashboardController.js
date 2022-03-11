const { validationResult } = require('express-validator');
const errorFormatter = require('../utlis/validationErrorFormatter');

exports.createProfile = (req, res, next) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty) {
            res.status(401).json({
                errors: errors.mapped(),
            });
        }
        const data = {
            ...req.body,
        };
        if (req.file) {
            data.profilePic = req.file.url;
        }
        res.send(data);
    } catch (err) {
        next(err);
    }
};
