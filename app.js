import express from 'express';
import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Service ');

});

app.listen(PORT, () => {
  console.log(`Server is running on port https://localhost:${PORT}` );
});

export default app;