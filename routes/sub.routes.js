import { Router } from "express";
const subscriptionrouter = Router();


subscriptionrouter.get('/', (req, res) => res.send({title:'GET Subscriptions'}));
subscriptionrouter.get('/:id', (req, res) => res.send({title:'GET Subscription details'}));
subscriptionrouter.post('/', (req, res) => res.send({title:'CREATE new Subscription'}));
subscriptionrouter.put('/:id', (req, res) => res.send({title:'UPDATE current Subscriptions'}));
subscriptionrouter.delete(':id', (req, res) => res.send({title:'DELETE Subscriptions'}));
subscriptionrouter.get('/user/:id', (req, res) => res.send({title:'GET all Subscriptions'}));
subscriptionrouter.put('/:id/cancel', (req, res) => res.send({title:'CANCEL Subscriptions'}));
subscriptionrouter.put('/:id/renew', (req, res) => res.send({title:'RENEW Subscriptions'}));


export default subscriptionrouter;