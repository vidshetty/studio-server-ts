"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeSessions = exports.checkServer = void 0;
const utils_1 = require("../helpers/utils");
const Users_1 = require("../models/Users");
const checkServer = (req) => {
    return { status: "active", server: utils_1.server };
};
exports.checkServer = checkServer;
const activeSessions = async (request) => {
    const { id = null } = request.ACCOUNT;
    const { sessionId = null } = request.result;
    const user = await Users_1.Users.findOne({ _id: id });
    const { activeSessions = [] } = user;
    return activeSessions.map(each => {
        const obj = Object.assign({}, each);
        obj.thisDevice = each.sessionId === sessionId;
        return obj;
    });
};
exports.activeSessions = activeSessions;
//# sourceMappingURL=api-functions.js.map