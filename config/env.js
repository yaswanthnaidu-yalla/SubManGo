import dotenv from 'dotenv';   
import path from 'path';


const envFile = `.env.${process.env.NODE_ENV||'development'}.local`;
console.log(`Loading environment variables from ${envFile}`);
dotenv.config({ path: envFile });
export const {PORT} = process.env.PORT ;
export const {DB_URI} = process.env.DB_URI ;
export const {NODE_ENV} = process.env.NODE_ENV ;