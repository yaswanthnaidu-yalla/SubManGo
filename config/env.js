import dotenv from 'dotenv';   

const envFile = `.env.${process.env.NODE_ENV||'development'}.local`;
console.log(`Loading environment variables from ${envFile}`);
dotenv.config({ path: envFile });
export const PORT = process.env.PORT ;