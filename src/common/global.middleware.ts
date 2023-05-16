import { Request, Response, NextFunction } from 'express';
import { NestMiddleware, Injectable } from '@nestjs/common';

@Injectable()
export class GlobalMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request... (global middleware)');
    next();
  }
}
