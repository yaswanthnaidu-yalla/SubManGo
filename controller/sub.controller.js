
import Subscription from '../models/subscription.model.js';

import mongoose from 'mongoose';

import { sendRemindersController } from './reminder.js';





export const welcomethingy = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        res.status(200).json({
            success: true,
            message: 'Welcome to the Subscriptions portal!',
            
        });
    } catch (error) {
        console.error('Error getting all subscriptions:', error);
        next(error);
    }
};
export const createsubscription = async (req, res, next) => {
    try {
        if (!req.body.name || !req.body.price || !req.body.billingCycle || !req.body.category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const subscription = await Subscription.create({
            userId: req.user._id, 
            ...req.body,
        });
        const reminderReq = {
           body: {
        subscriptionsToRemind: [subscription]
        }
    };
    const reminderRes = {
        status: () => ({
            json: (response) => {
                console.log('Reminder controller response:', response.message);
            }
        })
    };
    
    await sendRemindersController(reminderReq, reminderRes);

        

        res.status(201).json({
            success: true,
            message: 'Subscription created ',
            data: {
                ...subscription.toObject(),
            
            }
        });

    } catch (error) {
        console.error('Error creating subscription:', error);
        next(error);
    }
};
    export const getAllSubscriptions = async (req, res, next) => {
  try {
    
    console.log('User ID from URL:', req.params.id);

    
    const query = { userId: req.params.id };
    console.log('MongoDB Query:', query);

    const subscriptions = await Subscription.find(query);

    
    console.log('Found subscriptions count:', subscriptions.length);
    
    console.log('Found subscriptions:', subscriptions);

    res.status(200).json({
      success: true,
      message: 'Subscriptions fetched successfully',
      data: subscriptions
    });
  } catch (error) {
    next(error);
  }
};
export const getSubscriptionDetails = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid subscription ID.' });
        }
        const subscription = await Subscription.findById(id);
        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Subscription details fetched successfully.',
            subscription
        });
    } catch (error) {
        console.error('Error fetching subscription details:', error);
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid subscription ID.' });
        }
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );
        if (!updatedSubscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully.',
            subscription: updatedSubscription
        });
    } catch (error) {
        console.error('Error updating subscription:', error);
        next(error);
    }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid subscription ID.' });
        }
        const deletedSubscription = await Subscription.findByIdAndDelete(id);
        if (!deletedSubscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully.',
            subscription: deletedSubscription
        });
    } catch (error) {
        console.error('Error deleting subscription:', error);
        next(error);
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid subscription ID.' });
        }
        const cancelledSubscription = await Subscription.findByIdAndUpdate(
            id,
            { $set: { status: 'cancelled', cancellationDate: new Date() } },
            { new: true, runValidators: true }
        );
        if (!cancelledSubscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found.' });
        }
        res.status(200).json({
            success: true,
            message: 'Subscription cancelled successfully.',
            subscription: cancelledSubscription
        });
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        next(error);
    }
};
export const renewSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { newEndDate } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid subscription ID.' });
        }

        const subscription = await Subscription.findById(id);

        if (!subscription) {
            return res.status(404).json({ success: false, message: 'Subscription not found.' });
        }

        // Validate that the new end date is a valid date
        if (!newEndDate || isNaN(new Date(newEndDate))) {
            return res.status(400).json({ success: false, message: 'Invalid or missing newEndDate.' });
        }

        const renewedSubscription = await Subscription.findByIdAndUpdate(
            id,
            {
                $set: {
                    endDate: new Date(newEndDate),
                    status: 'active'
                }
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Subscription renewed successfully.',
            subscription: renewedSubscription
        });

    } catch (error) {
        console.error('Error renewing subscription:', error);
        next(error);
    }
};
export const getSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({});
        res.status(200).json({
            success: true,
            message: 'All subscriptions retrieved successfully.',
            subscriptions
        });
    } catch (error) {
        console.error('Error getting all subscriptions:', error);
        next(error);
    }
};




    
