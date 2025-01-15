import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { ISession } from '../interfaces/session.interface';

export const LocalStrategy = async (
  username: string,
  password: string,
  done: (error: any, user?: any, options?: IVerifyOptions) => void
) => {
  const userResponse = await AuthService.checkUser(username);

  if (userResponse.code === 400 || userResponse.code === 500) {
    return done(null, false, { message: '1' });
  }

  const DBuser = userResponse.data;

  const passwordMatch = await AuthService.checkPassword(DBuser, password);

  if (passwordMatch.code === 500 || (passwordMatch.code === 200 && !passwordMatch.data)) {
    return done(null, false, { message: '2' });
  }

  if (!DBuser.verified) {
    return done(null, false, { message: '3' });
  }

  const user: ISession = {
    uuid: DBuser.uuid,
    email: DBuser.email,
    user: DBuser.user,
    profile: DBuser.profile.profile,
  };

  return done(null, user);
};

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((id, done) => done(null, false));
