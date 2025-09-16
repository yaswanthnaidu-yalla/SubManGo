import { Router } from "express";
const userrouter = Router();
userrouter.get('/users', (req, res) => res.send({title:'GET Users'}));
userrouter.get('/:id', (req, res) => res.send({title:'GET user details'}));
userrouter.post('/', (req, res) => res.send({title:'CREATE User'}));
userrouter.put('/:id', (req, res) => res.send({title:'UPDATE Users'}));
userrouter.delete('/:id', (req, res) => res.send({title:'DELETE Users'}));
export default userrouter;
