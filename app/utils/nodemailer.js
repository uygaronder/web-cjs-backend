const nodemailer = require('nodemailer');

const defMailTemplate = "./mailTemplates/defaultdefMailTemplate";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

async function sendMail(email, subject, template = defMailTemplate, data = {}) {
    // handle sendmail
}

module.exports = transporter;