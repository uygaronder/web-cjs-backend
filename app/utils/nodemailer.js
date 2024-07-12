const nodemailer = require('nodemailer');

const defMailTemplate = "./mailTemplates/defaultdefMailTemplate";

console.log(defMailTemplate);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

async function sendMail(email, subject, template = defMailTemplate, data = {}) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject,
            text
        });
        console.log('Email sent');
    } catch (error) {
        console.error('Error sending email');
    }
}

module.exports = transporter;