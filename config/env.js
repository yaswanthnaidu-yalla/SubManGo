import dotenv from 'dotenv';   
import path from 'path';


const envFile = `.env.${process.env.NODE_ENV||'development'}.local`;
console.log(`Loading environment variables from ${envFile}`);
dotenv.config({ path: envFile });
export const {PORT} = process.env.PORT ;
export const {DB_URI} = process.env.DB_URI ;
export const {NODE_ENV} = process.env.NODE_ENV ;
export const {JWT_SECRET} = process.env.JWT_SECRET ;
   
//token - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGNhZjRmNDBhNjYzZWFkMDk0YWZlMTYiLCJpYXQiOjE3NTgxMzE0NDQsImV4cCI6MTc1ODMwNDI0NH0.QerGoZbDtmzVpS0eODFzmX29gT55nUfGVWQkMDWDJTA