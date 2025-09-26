import { Router } from "express";
import authorize from "../middlewear/auth.middlewear.js";

import { sendRemindersController } from "../controller/reminder.js";

const reminderrouter = Router()
reminderrouter.post('/',authorize, sendRemindersController);









export default reminderrouter 