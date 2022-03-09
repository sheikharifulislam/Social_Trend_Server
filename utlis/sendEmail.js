const nodemailer = require('nodemailer');

const sendEmail = async (userEmail, subject, template) => {
    try {
        const transpoter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.MAIL_SERVICE,
            secure: false,
            renew: true,
            auth: {
                type: 'OAuth2',
                user: process.env.USER,
                pass: process.env.PASS,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLINET_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN,
            },
        });

        await transpoter.sendMail({
            from: process.env.USER,
            to: userEmail,
            subject,
            html: template,
        });

        console.log('email send successfully');
    } catch (err) {
        console.log('email send failed');
        console.log(err);
    }
};

module.exports = sendEmail;
