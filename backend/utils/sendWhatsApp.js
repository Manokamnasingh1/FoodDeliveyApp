require('dotenv').config();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendToAdmin = async (message) => {
  return client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: process.env.TWILIO_WHATSAPP_TO,
    body: message
  });
};

const sendToUser = async (message, userPhone) => {
  return client.messages.create({
    from: process.env.TWILIO_WHATSAPP_FROM,
    to: `whatsapp:${userPhone}`,
    body: message
  });
};

module.exports = {
  sendToAdmin,
  sendToUser
};

