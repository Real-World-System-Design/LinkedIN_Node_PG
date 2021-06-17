import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { decode } from '../utils/jwt.util';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header('authorization').split(' ');
    if(!authHeader) throw new HttpException({message: "authorization failed"}, HttpStatus.UNAUTHORIZED);
    if(authHeader[0] !== "Token") throw new HttpException({message: "Token missing"}, HttpStatus.UNAUTHORIZED);
    try {
      const token = authHeader[1];
      const user = await decode(token);
      if(!user) throw new HttpException("user not found", HttpStatus.NOT_FOUND);
      (req as any).user = user;
      return next();
    } catch (e) {
      throw e;
    }
  }
}
