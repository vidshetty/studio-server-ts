"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const utils_1 = require("../helpers/utils");
const GOOGLE_CLIENT_ID = (0, utils_1.ENV)("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = (0, utils_1.ENV)("GOOGLE_CLIENT_SECRET");
const ENVIRONMENT = (0, utils_1.ENV)("ENVIRONMENT");
const googleStrat = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: ENVIRONMENT === "LOCAL" ? "/google-signin" :
        `${utils_1.APP_URL}/google-signin`
};
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.use(new passport_google_oauth20_1.Strategy(googleStrat, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
//# sourceMappingURL=index.js.map