import { NextFunction, Request, Response } from 'express';
import CONFIG from '../config/config';
import jwt from 'jsonwebtoken';
import { User } from '../entity/user.entity';
import { api } from '../app';
import { BannedUser } from '../entity/banned-user.entity';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === 'DEV') {
    next();
  }

  try {
    // TODO: Create Client IP Checker to avoid different ips request with the same token.

    const token = req.cookies[CONFIG.jwtCookieName];

    if (!token || token === '') {
      return res.status(423).send('Unauthorized');
    }

    const jwtPayload = <User>jwt.verify(token, CONFIG.jwtSecret);

    if (!jwtPayload) {
      return res.status(423).send('Unauthorized');
    }

    const isBanned = await api.getRepository(BannedUser).findOne({
      where: { uuid: jwtPayload.uuid },
    });
    const today = new Date();

    if (!!isBanned && isBanned.expireDate.getTime() > today.getTime()) {
      return res.status(423).send('Unauthorized - This user is Banned');
    }

    res.locals.user = jwtPayload;
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
}
