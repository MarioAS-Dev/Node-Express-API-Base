import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = Router();
const baseURL = '/api/user';

userRouter.post(baseURL, UserController.saveUser);

export default userRouter;
