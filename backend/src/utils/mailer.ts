import nodemailer from 'nodemailer';
import crypto from 'crypto';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWD,
  },
});

export async function sendMail(emailTo: string, subject: string, text: string) {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: emailTo,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

export function generateAuthCode() {
  return crypto.randomBytes(3).toString('hex').slice(0, 6);
}
