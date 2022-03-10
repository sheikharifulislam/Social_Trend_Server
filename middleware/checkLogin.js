const jwtTokenValidator = require('../validator/authencation/jwtTokenValidator');

module.exports = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (cookies) {
        try {
            const token = cookies[process.env.COOKIE_NAME].split(' ')[1];
            const decoded = jwtTokenValidator(token);
            if (decoded) {
                res.user = decoded;
                next();
            } else {
                res.status(401).json({
                    message: 'Unauthorized User',
                });
            }
        } catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    } else {
        res.status(401).json({
            message: 'Unauthorized User',
        });
    }
};
