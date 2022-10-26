import nodemailer from "nodemailer";

var mailTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bfa1322a9f57c7",
    pass: "b90d20ca97a69f",
  },
});

const sendMail = async (mailOptions: any) => {
  try {
    const mail = await mailTransport.sendMail(mailOptions);
    console.log("Email sent: ", mail.response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
