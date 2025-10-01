import { Router } from "express";
import authorize from "../middlewear/auth.middlewear.js";

import { cancelSubscription, createsubscription, deleteSubscription, getSubscriptionDetails, updateSubscription, renewSubscription, welcomethingy } from "../controller/sub.controller.js";
import { getAllSubscriptions } from "../controller/sub.controller.js";
import errorMiddlewear from "../middlewear/error.middlewear.js";

const subscriptionrouter = Router();


subscriptionrouter.get('/', authorize,errorMiddlewear,welcomethingy);
subscriptionrouter.get('/:id', authorize,errorMiddlewear,getSubscriptionDetails);
subscriptionrouter.post('/', authorize,errorMiddlewear,createsubscription);
subscriptionrouter.put('/:id', authorize,errorMiddlewear,updateSubscription);
subscriptionrouter.delete('/:id',authorize,errorMiddlewear, deleteSubscription);
subscriptionrouter.get('/user/:id',authorize,errorMiddlewear,getAllSubscriptions);
subscriptionrouter.put('/:id/cancel', authorize,errorMiddlewear,cancelSubscription);
subscriptionrouter.put('/:id/renew', authorize,errorMiddlewear,renewSubscription);


export default subscriptionrouter;