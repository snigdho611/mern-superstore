import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

var mailTransport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bfa1322a9f57c7",
    pass: "b90d20ca97a69f",
  },
});

const sendMail = async (mailOptions: Mail.Options) => {
  try {
    const mail = await mailTransport.sendMail(mailOptions);
    console.log("Email sent: ", mail.response);
  } catch (error: unknown) {
    console.log(error);
  }
};

export default sendMail;
