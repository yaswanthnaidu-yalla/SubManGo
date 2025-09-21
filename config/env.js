import dotenv from 'dotenv';   
import path from 'path';
export const SERVER_URL = process.env.SERVER_URL || "http://localhost:3000";

const envFile = `.env.${process.env.NODE_ENV||'development'}.local`;
console.log(`Loading environment variables from ${envFile}`);
dotenv.config({ path: envFile });
export const {PORT} = process.env.PORT ;
export const {DB_URI} = process.env.DB_URI ;
export const {NODE_ENV} = process.env.NODE_ENV ;
export const {JWT_SECRET} = process.env.JWT_SECRET ;
export const {ARCJET_ENV} = process.env.ARCJET_ENV ;
export const {ARCJET_KEY} = process.env.ARCJET_KEY ;
   
//token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGNhZjRmNDBhNjYzZWFkMDk0YWZlMTYiLCJpYXQiOjE3NTgxMzE0NDQsImV4cCI6MTc1ODMwNDI0NH0.QerGoZbDtmzVpS0eODFzmX29gT55nUfGVWQkMDWDJTA

export const QSTASH_URL = process.env.QSTASH_URL ;
export const QSTASH_TOKEN = process.env.QSTASH_TOKEN || "eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=";
