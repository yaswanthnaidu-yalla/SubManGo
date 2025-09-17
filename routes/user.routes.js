import { Router } from "express";
import { JWT_SECRET } from "../config/env.js";
import authorize from "../middlewear/auth.middlewear.js";
import errorMiddlewear from "../middlewear/error.middlewear.js";

import { getAllUsers } from "../controller/user.controller.js";   
import { getUser } from "../controller/user.controller.js";
import { get } from "mongoose";

const userrouter = Router();
userrouter.get('/', getAllUsers);
userrouter.get('/:id', authorize,errorMiddlewear,getUser);
userrouter.post('/', (req, res) => res.send({title:'CREATE User'}));
userrouter.put('/:id', (req, res) => res.send({title:'UPDATE Users'}));
userrouter.delete('/:id', (req, res) => res.send({title:'DELETE Users'}));
export default userrouter;
