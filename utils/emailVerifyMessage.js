const { SENDGRID_FROM_EMAIL } = process.env;

const emailVerifyMessage = (email, token) => {
  return {
    to: email,
    from: SENDGRID_FROM_EMAIL,
    subject: "Verify registartion",
    html: `<a href='http://localhost:3000/api/users/verify/${token}'>Click to verify email</a>`,
  };
};

module.exports = emailVerifyMessage;
