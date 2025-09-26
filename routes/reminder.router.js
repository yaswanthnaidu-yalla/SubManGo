import { Router } from "express";
import authorize from "../middlewear/auth.middlewear.js";

import { sendRemindersController } from "../controller/reminder.js";

const reminderrouter = Router()
reminderrouter.post('/reminders',authorize, sendRemindersController);









export default reminderrouter 