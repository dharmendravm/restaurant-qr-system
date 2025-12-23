import nodemailer from 'nodemailer'
import { APP_PASSWORD, MAIL_USER } from '../config.js';
 
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: APP_PASSWORD,
  },
});
export default transporter;
