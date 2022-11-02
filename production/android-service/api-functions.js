"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkServer = void 0;
const utils_1 = require("../helpers/utils");
const checkServer = (req) => {
    return { status: "active", server: utils_1.server };
};
exports.checkServer = checkServer;
//# sourceMappingURL=api-functions.js.map