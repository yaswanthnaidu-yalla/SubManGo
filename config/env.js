import dotenv from 'dotenv';   
import path from 'path';


const envFile = `.env.${process.env.NODE_ENV||'development'}.local`;
console.log(`Loading environment variables from ${envFile}`);
dotenv.config({ path: envFile });
export const {PORT} = process.env.PORT ;
export const {DB_URI} = process.env.DB_URI ;
export const {NODE_ENV} = process.env.NODE_ENV ;
export const {JWT_SECRET} = process.env.JWT_SECRET ;
export const {ARCJET_ENV} = process.env.ARCJET_ENV ;
export const {ARCJET_KEY} = process.env.ARCJET_KEY ;
export const {SERVER_URL} = process.env.SERVER_URL;
   
export const {APP_PASS} = process.env.APP_PASS;