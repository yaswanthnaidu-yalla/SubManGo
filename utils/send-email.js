import { emailTemplates } from "../utils/emailtemplate.js"; 
import transporter from "../config/nodemailer.js";
import { accountEmail } from "../config/nodemailer.js";
import dayjs from "dayjs";
export const sendRemainderEmail = async (options) => {
    const { to, type, subscription } = options;
    if(!to || !type) throw new Error('Missing Required parameters: to');
    const template = emailTemplates.find((t)=>t.label === type);

    if(!template) throw new Error(`Email template not found for type: ${type}`);

    const mailInfo = {
        userName: subscription.userId.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.RenewalDate).format('YYYY-MM-DD'),
        planName: subscription.name,
        price: subscription.price,
        paymentMethod: subscription.paymentMethod,

    }
    const message = template.generateBody(mailInfo);
    const subjectLine = template.generateSubject(mailInfo);
    const mailOptions = {
        from: accountEmail,
        to,
        subject: subjectLine,
        html: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        }
        console.log('Email sent:',  info.response);
    });
}
