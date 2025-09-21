import { Router } from "express";
import { sendreminders } from "../controller/wf.controller.js";

const workflowRouter = Router();

workflowRouter.post("/subscription/reminder", sendreminders
);

export default workflowRouter;