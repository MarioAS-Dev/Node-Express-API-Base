import { Request, Response, Router } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';

const apiRouter = Router();

apiRouter.get('/', (req: Request, res: Response) => {
  res.status(403).send('403 Unauthorized - You should not be there!');
});

apiRouter.get('/api', (req: Request, res: Response) => {
  res.status(404).send('You have to provide the API Controller route!');
});

apiRouter.use(authRouter);
apiRouter.use(userRouter);

export default apiRouter;
