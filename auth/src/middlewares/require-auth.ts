import { Request, Response, NextFunction } from 'express';

import { NotAuthorizedErro } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedErro();
  }
  next();
};
