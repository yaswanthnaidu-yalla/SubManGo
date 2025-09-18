import { Router } from "express";
import authorize from "../middlewear/auth.middlewear.js";
import { createsubscription } from "../controller/sub.controller.js";
import { getAllSubscriptions } from "../controller/sub.controller.js";

const subscriptionrouter = Router();


subscriptionrouter.get('/', (req, res) => res.send({title:'GET Subscriptions'}));
subscriptionrouter.get('/:id', (req, res) => res.send({title:'GET Subscription details'}));
subscriptionrouter.post('/', authorize,createsubscription);
subscriptionrouter.put('/:id', (req, res) => res.send({title:'UPDATE current Subscriptions'}));
subscriptionrouter.delete(':id', (req, res) => res.send({title:'DELETE Subscriptions'}));
subscriptionrouter.get('/user/:id',authorize,getAllSubscriptions);
subscriptionrouter.put('/:id/cancel', (req, res) => res.send({title:'CANCEL Subscriptions'}));
subscriptionrouter.put('/:id/renew', (req, res) => res.send({title:'RENEW Subscriptions'}));


export default subscriptionrouter;