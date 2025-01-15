import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import useragent from 'express-useragent';
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';

import apiRouter from '../routes/api.routes';
import CONFIG from './config';
import { Strategy } from 'passport-local';
import { LocalStrategy } from './passport';

export default class Server {
	private static _instance: Express;

	constructor(port: number) {
		const server = Server.getInstance();

		this.initializeMiddlewares(server);
		this.initializeRouting(server);
		this.start(server, port);
	}

	private static getInstance(): Express {
		if (this._instance) {
			return this._instance;
		}

		this._instance = express();
		return this._instance;
	}

	private initializeMiddlewares(app: Express): void {
		app.use(express.json({ limit: '5mb' }));
		app.use(express.urlencoded({ extended: true }));
		app.use(cookieParser());
		app.use(
			cookieSession({
				name: 'app-cookie',
				secret: CONFIG.jwtSecret,
				httpOnly: true,
				expires: new Date(Date.now() + 3600000 * 8), // Cookie Session 8h
			})
		);
		app.use(useragent.express());
		passport.use(new Strategy({ usernameField: 'email' }, LocalStrategy));
		app.use(passport.initialize());
		app.use(passport.session());
		app.use(helmet());
		app.use(morgan('dev'));
		app.use(cors(CONFIG.corsOptions));
	}

	private initializeRouting(app: Express): void {
		app.use(apiRouter);
	}

	private start(server: Express, port: number) {
		server.listen(port, () => {
			console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
		});
	}
}
