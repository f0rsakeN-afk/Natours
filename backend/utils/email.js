const nodemailer = require('nodemailer');
const sendEmail = async (options) => {
  //create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  });
  //define the email options
  const mailOptions = {
    from: 'Naresh Rajbanshi <test@naresh.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };
  //send the email with nodemailer
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
