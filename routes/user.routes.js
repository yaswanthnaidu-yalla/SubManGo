import { Router } from "express";
import { JWT_SECRET } from "../config/env.js";
import authorize from "../middlewear/auth.middlewear.js";
import errorMiddlewear from "../middlewear/error.middlewear.js";

import { createUser, deleteUser, getAllUsers, updateUser } from "../controller/user.controller.js";   
import { getUser } from "../controller/user.controller.js";
import { get } from "mongoose";

const userrouter = Router();
userrouter.get('/',authorize, getAllUsers);
userrouter.get('/:id', authorize,errorMiddlewear,getUser);
userrouter.post('/', authorize, createUser);
userrouter.put('/:id', authorize, updateUser);
userrouter.delete('/:id', authorize, deleteUser);
export default userrouter;
