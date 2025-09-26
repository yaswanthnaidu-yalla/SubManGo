import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), `.env.development.local`) });
import express from 'express';
import ajmw from './middlewear/ajmw.js';
import userrouter from './routes/user.routes.js';
import subscriptionrouter from './routes/sub.routes.js';
import authrouter from './routes/auth.routes.js';
import errorMiddlewear from './middlewear/error.middlewear.js';
import cookieParser from 'cookie-parser';





const app = express(); // Declare app at the top

const port = process.env.PORT || 3000;

app.use(ajmw);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/auth', authrouter);
app.use('/api/v1/users', userrouter);
app.use('/api/v1/subscriptions', subscriptionrouter);


app.use(errorMiddlewear);

app.get('/', (req, res) => {
  res.send('Welcome to the SubManGo ');
});

app.listen(port, async () => {
  console.log(`Server is running on port http://localhost:${port}`);
  const { default: connectDB } = await import('./DATABASE/mongodb.js');
  await connectDB();
});

console.log('DEBUG- DB_URI:', process.env.DB_URI);
console.log('DEBUG - ALL env vars:', Object.keys(process.env).filter(key => key.includes('DB')));

export default app;