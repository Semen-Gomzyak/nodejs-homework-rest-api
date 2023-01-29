const dotenv = require('dotenv');
dotenv.config();

const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY_SYSTEMCATS } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY_SYSTEMCATS);
const sendEmail = async data => {
  try {
    const email = { ...data, from: 'blacklife1817@gmail.com' };
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
