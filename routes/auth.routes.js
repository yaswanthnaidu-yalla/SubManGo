import e, { Router } from "express";
import { signUP } from "../controller/auth.controller.js";
import { signIN } from "../controller/auth.controller.js";
import { signOUT } from "../controller/auth.controller.js";

const authrouter = Router();
authrouter.post('/SIGN-UP', signUP);
authrouter.post('/SIGN-IN', signIN);;
authrouter.post('/SIGN-OUT', signOUT);
export default authrouter;