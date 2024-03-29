import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import {errorHandler,NotFoundError } from '@adjticketing/common'

import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';


const app = express();
app.use(express.json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV!=='test',
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }
