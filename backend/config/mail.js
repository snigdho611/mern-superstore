const nodemailer = require("nodemailer");

var mailTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMail = async (mailOptions) => {
  try {
    const mail = await mailTransport.sendMail(mailOptions);
    console.log("Email sent: ", mail.response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
