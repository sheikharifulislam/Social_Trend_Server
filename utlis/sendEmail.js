const nodemailer = require("nodemailer");

const sendEmail = async(email,subject,template) => {
    try{        
        const transpoter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.MAIL_SERVICE,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        })

        await transpoter.sendMail({
            from:  process.env.USER,
            to: email,
            subject,
            html: template,
        });

        console.log('email send successfully');
    }
    catch(err) {
        console.log('email send failed');
        console.log(err.template);
    }
}

module.exports = sendEmail;