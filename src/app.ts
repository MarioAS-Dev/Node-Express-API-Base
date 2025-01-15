import dotenv from 'dotenv';
import Server from './config/server';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '/config/.env') });

const port = process.env.PORT as unknown as number;

export const app = new Server(port);
