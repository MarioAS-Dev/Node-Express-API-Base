import { Request, Response } from 'express';

import { AuthService } from '../services/auth.service';

import { ISession } from '../interfaces/session.interface';
import CONFIG from '../config/config';
import { IGenericResponse } from '../interfaces/generic-response.interface';

export class AuthController {
  public static login = async (req: Request, res: Response) => {
    const session: ISession = <ISession>req.user;
    const token = AuthService.generateToken(session);

    res.cookie(CONFIG.jwtCookieName, token, {
      httpOnly: false,
      secure: CONFIG.environment !== 'DEV',
    });

    const response: IGenericResponse = { code: 200, data: session };
    res.send(response);
  };

  public static authError = async (req: Request, res: Response) => {
    const messages: string[] = req.session ? req.session.messages : ['1'];
    const lastMessage = messages.pop();

    res.status(400).send({ code: 400, data: lastMessage });
  };
}
