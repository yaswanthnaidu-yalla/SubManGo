import nodemailer from 'nodemailer';
import {APP_PASS} from './env.js';
export const account = 'yaswanthnaidu004@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {user : account,
    pass : APP_PASS}
 });
 export default transporter;