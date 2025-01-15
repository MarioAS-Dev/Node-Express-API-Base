import { Request, Response } from 'express';
import { api } from '../app';
import { User } from '../entity/user.entity';
import bcrypt from 'bcrypt';

export class UserController {
  public static async saveUser(req: Request, res: Response) {
    const user: User = <User>req.body;
    console.log(req.body);

    try {
      const userRepo = api.getRepository(User);
      const hashedPassword = await bcrypt.hash(user.password, 12);
      const result = await userRepo.save({
        ...user,
        password: hashedPassword,
        profileId: 2,
        verified: false,
      });

      res.send(result);
    } catch (error) {
      console.log(error);

      const response = { code: 9003, message: 'Se produjo un error al guardar el usuario!' };
      res.status(500).send(response);
    }
  }
}
