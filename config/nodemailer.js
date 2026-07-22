import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";
export const accountEmail = "yaswanthnaidu004@gmail.com";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "yaswanthnaidu004@gmail.com",
        pass: EMAIL_PASSWORD
}})

export default transporter;