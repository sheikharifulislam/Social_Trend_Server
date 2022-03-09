const crypto = require('crypto');

const acountVerifyTemplate = async (userData, token) => {
    const randomId = crypto.randomBytes(16).toString('hex');
    const link = `${process.env.HOST}auth/authentication/verify-acount/?user=${randomId}&&token=${token}&&userId=${userData._id}`;
    return `Hello ${userData.userName}. Please verify you acount by clicking the link: <strong><a href=${link}>Click here to verify the given Link <a/></strong>`;
};

module.exports = acountVerifyTemplate;
