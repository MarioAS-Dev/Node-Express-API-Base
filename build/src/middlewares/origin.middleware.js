"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrigin = void 0;
const checkOrigin = (req, res, next) => {
    // const allowedOrigin = CONFIG.site;
    // const origin = req.headers.get('origin');
    // if (!!origin && allowedOrigin === origin) {
    //   res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    // res.header(
    //   'Access-Control-Allow-Headers',
    //   'Origin, X-Requested-With, Content-Type, Accept'
    // );
    next();
};
exports.checkOrigin = checkOrigin;
//# sourceMappingURL=origin.middleware.js.map