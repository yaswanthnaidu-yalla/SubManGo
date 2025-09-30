import { emailTemplates } from "./emailtemplate.js";

import dayjs from "dayjs";
import transporter   from "../config/nodemailer.js";
import { account } from "../config/nodemailer.js";

export const sendEmail = async (to, type, subscription) => {
    if(!to||!type) throw new Error('Missing required parameters');

    const template = emailTemplates.find((t)=> t.label === type);
    if (!template) throw new Error('Invalid email type');

    const mailinfo = {
        username: subscription.username,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.RenewalDate).format('MMMM D, YYYY'),
        price: `${subscription.price} ${subscription.currency}`,
        paymentmethod:subscription.paymentMethod,
        billingCycle: subscription.billingCycle,
    }
    const message = template.generateBody(mailinfo);
        
    const subject = template.subject(mailinfo);

    const mailoptions = {
        from: account ,
        to: to,
        subject: subject,
        html: message,
    };
        transporter.sendMail(mailoptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    };