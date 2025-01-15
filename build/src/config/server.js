"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Server {
    constructor() { }
    static getInstance() {
        if (!!this._instance) {
            return this._instance;
        }
        return;
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map