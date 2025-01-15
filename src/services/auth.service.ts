import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import CONFIG from '../config/config';

import { ISession } from '../interfaces/session.interface';
import { IGenericResponse } from '../interfaces/generic-response.interface';

export class AuthService {
	public static async checkUser(email: string): Promise<IGenericResponse> {
		try {
			const response: IGenericResponse = {
				code: 200,
				data: { email: 'test@user.com', name: 'Local user', role: 'Admin' },
			};

			return response;
		} catch (error) {
			return { code: 500, data: error };
		}
	}

	public static async checkPassword(DBUser: string, password: string): Promise<IGenericResponse> {
		try {
			const result = await bcrypt.compare(password, DBUser);
			return { code: 200, data: result };
		} catch (error) {
			return { code: 500, data: error };
		}
	}

	public static generateToken(user: ISession): string {
		return jwt.sign(user, CONFIG.jwtSecret, { expiresIn: 90000 });
	}
}
