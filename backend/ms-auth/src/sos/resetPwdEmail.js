const nodemailer = require('nodemailer');

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
function ResetPwdEmail(to, token) {

    let mailOptions = {
        from: 'ikram2002yousfi@gmail.com', // sender address
        to: to, 
        subject: 'Password Reset Request',
        html: `
          <p>You are receiving this email because you have requested to reset the password for your account!</p>
          <p>Please click the following link to reset your password:</p>
          <a href="http://127.0.0.1:3000/ResetPsswd/${token}">here</a>
        `,
    
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          //  return console.log(error);
             return res.status(500).send('Email not sent');
        }
        console.log('Message sent: %s', info.messageId);
    });
}
module.exports={ResetPwdEmail}