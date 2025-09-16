import express from 'express';
import { PORT } from './config/env.js';
import userrouter from './routes/user.routes.js'; 
import subscriptionrouter from './routes/sub.routes.js';
import authrouter from './routes/auth.routes.js';


const app = express();

app.use('/api/v1/users', userrouter);
app.use('/api/v1/subscriptions', subscriptionrouter);
app.use('/api/v1/auth', authrouter);
app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Service ');

});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}` );
});

export default app;