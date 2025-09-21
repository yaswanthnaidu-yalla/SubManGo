import {createRequire} from 'module';
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
const { serve } = require('@upstash/workflow/express');
import { serve } from "@upstash/workflow/express";

export const { POST } = serve(async (context) => {
  await context.run("first-step", () => {
    console.log("first step ran");
  });

  await context.run("second-step", () => {
    console.log("second step ran");
  });
});
const Reminders=[1,3,7];

export const sendreminders = serve(async (context) => {
    const { subscriptionId } = context.requestPayload;
    const subscription = await fetchsubscriptionID(context, subscriptionId);
    if (!subscription|| subscription.status !== 'active') {return;}
    const renewalDate = dayjs(subscription.renewalDate);
    if (renewalDate.isBefore(dayjs())){
        console.log(`Subscription ${subscriptionId} has expired.`);
        return;
    }

    for (const daysBefore of Reminders) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if(reminderDate.isAfter(dayjs())){
            await sleepuntilreminder(context, `${daysBefore}-day`, reminderDate);
    }
        await triggerreminderemail(context, `${daysBefore}-day`);
    }
});

const fetchsubscriptionID = async (context, subscriptionId) => {
    return await context.run('get subscription',async()=>{
       
        return Subscription.findById(subscriptionId).populate('user','email name');
    });
}
const sleepuntilreminder= async (context, label, date)=>{
    console.log(`Sleeping until ${label} reminder for ${date.format('YYYY-MM-DD')}`);
    await context.sleepUntil(label,date.toDate());
    console.log(`Woke up for ${label} reminder for ${date.format('YYYY-MM-DD')}`);
}
const triggerreminderemail= async (context, label)=>{
    return await context.run(label,()=>{
        console.log(`Sending ${label} reminder email`);
        // Implement email sending logic here
    });
}