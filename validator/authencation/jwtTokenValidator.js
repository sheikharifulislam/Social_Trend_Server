const jwt = require('jsonwebtoken');

const jwtTokenValidator = (token) => {
    let result = false;
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            result = false;
        } else if (payload) {
            const { exp } = payload;
            if (Date.now() < exp * 1000) {
                result = payload;
            } else {
                result = false;
            }
        } else {
            result = false;
        }
    });

    return result;
};

module.exports = jwtTokenValidator;
