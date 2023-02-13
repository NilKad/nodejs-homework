const sgMail = require("@sendgrid/mail");
const emailVerifyMessage = require("./emailVerifyMessage");
const { SENGRID_API_KEY } = process.env;
sgMail.setApiKey(SENGRID_API_KEY);

const sendEmail = (email, verificationToken) => {
  sgMail
    .send(emailVerifyMessage(email, verificationToken))
    .then((e) => {
      console.log(`Email: ${email} for verification send OK`);
    })
    .catch((e) => {
      console.log(`Error send email ${email} for verifiation`);
      throw new Error(`Error send email ${email} for verifiation`);
    });
};

module.exports = sendEmail;
