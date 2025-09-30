import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
import { sendEmail } from '../utils/sendEmials.js';

const REMINDER_DAYS = [7, 5, 2, 1];


export const sendRemindersController = async (req, res) => {
    try {
        console.log('request recieved!');
        const today = dayjs().startOf('day');

        const subscriptionsToRemind = await Subscription.find({
            status: 'active',
            RenewalDate: {
                $gte: today.toDate(),
                $lte: today.add(7, 'day').toDate(),
            },
        });

        for (const subscription of subscriptionsToRemind) {
            const renewalDate = dayjs(subscription.RenewalDate);
            const daysUntilRenewal = renewalDate.diff(today, 'day');

            if (REMINDER_DAYS.includes(daysUntilRenewal)) {
                console.log(`Sending a ${daysUntilRenewal}-day reminder for subscription ${subscription._id}`);
                await sendEmail({
                    to: subscription.user.email,
                    type: reminder.label.subscription,
                    
                });
            }
        }
        return res.status(200).json({ message: 'Reminders processed successfully.' });
    } catch (error) {
        console.error('Error in sendRemindersController:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}; 