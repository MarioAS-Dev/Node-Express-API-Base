const environment = process.env.NODE_ENV;
const frontendEnpoint = 'http://localhost:4200';
const allowedOrigins = ['http://localhost:8080'];
const corsOptions = {
	origin: allowedOrigins,
	optionsSuccessStatus: 200,
};

const jwtSecret = process.env.JWT_SECRET || 'devjwtsecret';
const jwtCookieName = 'jwt-token';

const CONFIG = {
	allowedOrigins,
	corsOptions,
	jwtCookieName,
	jwtSecret,
	environment,
	frontendEnpoint,
};

export default CONFIG;
