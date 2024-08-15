import formData from 'form-data';
import Mailgun from 'mailgun.js';
import dotenv from 'dotenv';

dotenv.config();

const mailgun = new Mailgun(formData);
const mg = mailgun.client({ 
  username: 'api', 
  key: process.env.MAILGUN_API_KEY 
});

export const sendOrderConfirmation = async ({ email, details }) => {
  try {
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: 'Friends Application <no-reply@your-domain.com>',
      to: email,
      subject: 'Registration Confirmation',
      text: 'Thank you for registering!',
      html: details
    });
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
