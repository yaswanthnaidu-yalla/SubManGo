import Subscription from '../models/subscription.model.js';
import mongoose from 'mongoose';

export const createsubscription = async (req, res, next) => {
    try {
        
        
        if (!req.body.name || !req.body.price || !req.body.billingCycle || !req.body.category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
         const subscription = await Subscription.create({
      // Change 'user' to 'userId' to match the schema
      userId: req.user._id, 
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription,
    });
        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription
        }
        )
        
    } catch (error) {
        console.error('Error creating subscription:', error);
        next(error);
        
    }}
    export const getAllSubscriptions = async (req, res, next) => {
  try {
    // Log the incoming user ID from the URL
    console.log('User ID from URL:', req.params.id);

    // Log the query object that will be sent to the database
    const query = { userId: req.params.id };
    console.log('MongoDB Query:', query);

    const subscriptions = await Subscription.find(query);

    // Log the number of documents found
    console.log('Found subscriptions count:', subscriptions.length);

    // Log the actual data that was found
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


    export default {createsubscription,getAllSubscriptions};
