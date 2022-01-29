"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("./utils");
const mongohandler = () => {
    mongoose_1.default.connect((0, utils_1.ENV)("MONGO_URI"));
    mongoose_1.default.connection.once("open", () => {
        console.log("Connected to DB");
    });
    mongoose_1.default.connection.on("error", () => {
        console.log("Error connecting to DB");
    });
};
exports.default = mongohandler;
//# sourceMappingURL=mongohandler.js.map