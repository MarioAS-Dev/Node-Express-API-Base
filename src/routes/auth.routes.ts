import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import passport from 'passport';

const authRouter = Router();
const baseURL = '/auth/';

authRouter.get(`${baseURL}login`, [
  passport.authenticate('local', {
    failureRedirect: `error`,
    failureMessage: true,
  }),
  AuthController.login,
]);

authRouter.get(`${baseURL}error`, AuthController.authError);

export default authRouter;
