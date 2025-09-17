import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(process.cwd(), `.env.development.local`)});
import express from 'express';

import userrouter from './routes/user.routes.js'; 
import subscriptionrouter from './routes/sub.routes.js';
import authrouter from './routes/auth.routes.js';

const { PORT } = process.env;



console.log('DEBUG- DB_URI:', process.env.DB_URI);
console.log('DEBUG - ALL env vars:', Object.keys(process.env).filter(key => key.includes('DB')));

const app = express();

app.use('/api/v1/users', userrouter);
app.use('/api/v1/subscriptions', subscriptionrouter);
app.use('/api/v1/auth', authrouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Service ');

});

app.listen(PORT, async() => {
  console.log(`Server is running on port http://localhost:${PORT}` );
  const {default: connectDB} = await import('./DATABASE/mongodb.js');
  await connectDB();
});

export default app;