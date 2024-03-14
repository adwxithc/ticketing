import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundError } from '@adjticketing/common'



const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV!=='test',
  })
);



app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }
