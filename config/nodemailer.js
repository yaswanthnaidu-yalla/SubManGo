import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";
import { accountEmail } from "./env.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: accountEmail,
        pass: EMAIL_PASSWORD
}})

export default transporter;