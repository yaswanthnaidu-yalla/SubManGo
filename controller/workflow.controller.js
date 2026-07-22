import {createRequire} from "module";
import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
const require = createRequire(import.meta.url);
const {serve} = require("@upstash/workflow/express");

const REMINDERS = [7,5,2,1];

export const sendReminders = serve(async(context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);
    if (!subscription || subscription.status !== 'active') return;
    const renewalDate = dayjs(subscription.RenewalDate);
    if (renewalDate.isBefore(dayjs())) {
        console.log(`Subscription ${subscriptionId} has expired. No reminder sent.`);
        return;
    }
    for (const daysBefore of REMINDERS) {
        const reminderDate = renewalDate.subtract(daysBefore, 'day');
        if (dayjs().isBefore(reminderDate)) {
            await sleepUntilReminder(
                context,
                `Reminder ${daysBefore} days before`,
                reminderDate
            );
        }
        await triggerReminder(
            context,
            `Reminder ${daysBefore} days before`,
        )
    }
});

const fetchSubscription = async (context, subscriptionId) => {
   return await context.run('get subscription', async () => {
     const subscription = await Subscription.findById(subscriptionId)
        .populate({ path: 'userId', select: 'name email' })
        .lean();

     if (!subscription) {
       throw new Error(`Subscription ${subscriptionId} not found`);
     }

     return subscription;
   });
}

const sleepUntilReminder = async(context, label, date) => {
    console.log(`Sleeping until ${label} reminder date at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, () => {
        console.log(`Triggering ${label} reminder`);
    })
}