const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsAppOTP = async (phone, otp) => {
  const fullPhone = `whatsapp:+91${phone}`; // Use correct format with +91
  const body = `👋 Welcome to FoodApp! Your OTP is: ${otp}`;

  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM, // e.g. whatsapp:+14155238886
      to: fullPhone,
      body,
    });

    console.log('✅ OTP sent:', message.sid);
    return message.sid;
  } catch (error) {
    console.error('❌ OTP sending failed:', error.message);
    throw error;
  }
};
module.exports = sendWhatsAppOTP;



