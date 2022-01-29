"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const utils_1 = require("../helpers/utils");
const GMAIL_CLIENT_ID = (0, utils_1.ENV)("GMAIL_CLIENT_ID");
const GMAIL_CLIENT_SECRET = (0, utils_1.ENV)("GMAIL_CLIENT_SECRET");
const GMAIL_REDIRECT_URI = (0, utils_1.ENV)("GMAIL_REDIRECT_URI");
const GMAIL_REFRESH_TOKEN = (0, utils_1.ENV)("GMAIL_REFRESH_TOKEN");
const GMAIL_USERNAME = (0, utils_1.ENV)("GMAIL_USERNAME");
const oAuthClient = new googleapis_1.google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REDIRECT_URI);
oAuthClient.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });
const sendEmail = async (options) => {
    const accessToken = await oAuthClient.getAccessToken();
    const transport = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: GMAIL_USERNAME,
            clientId: GMAIL_CLIENT_ID,
            clientSecret: GMAIL_CLIENT_SECRET,
            refreshToken: GMAIL_REFRESH_TOKEN,
            accessToken
        }
    });
    if (!options.from)
        options.from = "StudioMusic <studiomusiccompany@gmail.com>";
    try {
        return await transport.sendMail(options);
    }
    catch (e) {
        throw e;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=index.js.map