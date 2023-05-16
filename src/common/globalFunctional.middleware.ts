import { Request, Response, NextFunction } from 'express';

export function globalFunctionalMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Request... (global functional middlware)');
  next();
}
