const nodemailer = require('nodemailer');
const MyConstants = require('./MyConstants');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
    user: MyConstants.EMAIL_USER,
    pass: 'hsxbuafwmxetcjkv'
  },
  secure: true,
});
const EmailUtil = {
  send(email, id, token) {
    const text = 'Thanks for signing up, please input these informations to activate your account:\n\t .id: ' + id + '\n\t .token: ' + token;
    return new Promise(function (resolve, reject) {
      const mailOptions = {
        from: MyConstants.EMAIL_USER,
        to: email,
        subject: 'Signup | Verification',
        text: text
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Error in sending email  ' + error);
          return true;
        } else {
         console.log('Email sent: ' + info.response);
         return false;
        }
       });
    });
  }
};
module.exports = EmailUtil;