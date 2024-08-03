const nodemailer = require('nodemailer');
const tls = require('tls');

// Create a custom TLS configuration to ignore certificate validation
const tlsConfig = {
    rejectUnauthorized: false
};

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ikram2002yousfi@gmail.com',
        pass: 'hnavgxyzasmudjpd'
    }
});

// setup email data with unicode symbols
function sendEmail(to, nom, prenom) {
    const email = to;
    console.log(email);
    let mailOptions = {
        from: 'ikram2002yousfi@gmail.com', // sender address
        to: email, // dynamic "to" field
        subject: "Registration confirmation",
        html: `<p>Hello ${nom} ${prenom}, <br> Thank you for registering! Please click the following link to confirm your registration:</p><a href="http://localhost:3000/confirm/${email}">Confirm Registration</a>`,

    
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}
module.exports={sendEmail}