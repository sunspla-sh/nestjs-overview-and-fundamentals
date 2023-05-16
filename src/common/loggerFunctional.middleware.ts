import { Request, Response, NextFunction } from 'express';

export function loggerFunctionalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Request... (functional middleware)');
  next();
}
