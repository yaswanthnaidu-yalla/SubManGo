import { Router } from "express";
import authorize from "../middlewear/auth.middlewear";
import errorMiddlewear from "../middlewear/error.middlewear";
import { sendRemindersController } from "../controller/gcscontroller";

const gcsrouter = Router()
gcsrouter.get('/reminders/send',authorize,errorMiddlewear, sendRemindersController);









export default gcsrouter 