import Subscription from '../models/subscription.model.js';

export const createsubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create(
            {
                ...req.body,
                user: req.userId,
            }
        );
        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription
        }
        )
        
    } catch (error) {
        next(error);
        
    }}
    

export const getAllSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error('Unauthorized access');
            error.statusCode = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ userId: req.params.id });
        res.status(200).json({
            success: true,
            message: 'Subscriptions fetched successfully',
            data: subscriptions
            
            
        });
    } catch (error) {
        next(error);
    }}
    export default {createsubscription,getAllSubscriptions};
