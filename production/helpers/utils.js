"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildroot = exports.issuer = exports.refreshTokenExpiry = exports.accessTokenExpiry = exports.timezone = exports.defaultAccess = exports.checkRedirectUri = exports.calcPeriod = exports.setRedirectUriCookie = exports.redirectUriCookieConfig = exports.standardCookieConfig = exports.cookieParser = exports.server = exports.date = exports.ejsRender = exports.wait = exports.ENV = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const ejs_1 = __importDefault(require("ejs"));
const ENV = (type) => {
    return process.env[type] || "";
};
exports.ENV = ENV;
const wait = (time) => {
    return new Promise((resolve, _) => setTimeout(resolve, time));
};
exports.wait = wait;
const ejsRender = (path, values) => {
    return new Promise((resolve, reject) => {
        ejs_1.default.renderFile(path, values, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};
exports.ejsRender = ejsRender;
const date = (val) => (0, moment_timezone_1.default)(val, "DD-MM-YYYY").toDate();
exports.date = date;
exports.server = (() => {
    const SERVER = (0, exports.ENV)("SERVER");
    if (SERVER === "MAIN") {
        return [
            `https://songserver1.herokuapp.com`,
            `https://songserver2.herokuapp.com`,
            `https://songserver3.herokuapp.com`,
            `https://songserver4.herokuapp.com` //3
        ];
    }
    if (SERVER === "BACKUP1") {
        return [
            `https://songserver1-backup1.herokuapp.com`,
            `https://songserver2-backup1.herokuapp.com`,
            `https://songserver3-backup1.herokuapp.com`,
            `https://songserver4-backup1.herokuapp.com` //3
        ];
    }
    if (SERVER === "BACKUP2") {
        return [
            `https://songserver1-backup2.herokuapp.com`,
            `https://songserver2-backup2.herokuapp.com`,
            `https://songserver3-backup2.herokuapp.com`,
            `https://songserver4-backup2.herokuapp.com` //3
        ];
    }
    return [];
})();
const cookieParser = (request) => {
    const cookies = request.headers.cookie;
    const obj = {};
    if (cookies === "" || cookies === undefined)
        return obj;
    const removedSpaces = cookies.split(" ").join("");
    const separated = removedSpaces.split(";");
    for (let i = 0; i < separated.length; i++) {
        const split = separated[i].split("=");
        if (split[0] !== "ACCOUNT" && split[0] !== "ACCOUNT_REFRESH")
            continue;
        obj[split[0]] = split[1];
    }
    return obj;
};
exports.cookieParser = cookieParser;
exports.standardCookieConfig = {
    sameSite: "none",
    secure: true,
    domain: (0, exports.ENV)("ENVIRONMENT") === "LOCAL" ? "localhost" :
        "studiomusic.herokuapp.com",
    maxAge: 40 * 24 * 60 * 60 * 1000,
    httpOnly: true
};
exports.redirectUriCookieConfig = {
    sameSite: "none",
    secure: true,
    domain: (0, exports.ENV)("ENVIRONMENT") === "LOCAL" ? "localhost" :
        "studiomusic.herokuapp.com",
    maxAge: 5 * 60 * 1000,
    httpOnly: true
};
const setRedirectUriCookie = (path, response) => {
    response.cookie("REDIRECT_URI", path, exports.redirectUriCookieConfig);
};
exports.setRedirectUriCookie = setRedirectUriCookie;
const calcPeriod = (duration) => {
    const __math = (val) => Math.floor(val);
    const seconds = __math(duration.asSeconds());
    const mins = __math(duration.asMinutes());
    const hours = __math(duration.asHours());
    const days = __math(duration.asDays());
    const months = __math(duration.asMonths());
    const years = __math(duration.asYears());
    if (years) {
        // if (years > 1) return "unlimited";
        let time = `${years} ${years > 1 ? "years" : "year"}`;
        const rem = months - (years * 12);
        if (rem > 0)
            time += ` ${rem} ${rem > 1 ? "months" : "month"}`;
        return time;
    }
    if (months) {
        let time = `${months} ${months > 1 ? "months" : "month"}`;
        const rem = days - (months * 30);
        if (rem > 0)
            time += ` ${rem} ${rem > 1 ? "days" : "day"}`;
        return time;
    }
    if (days) {
        let time = `${days} ${days > 1 ? "days" : "day"}`;
        const rem = hours - (days * 24);
        if (rem > 0)
            time += ` ${rem} ${rem > 1 ? "hours" : "hour"}`;
        return time;
    }
    if (hours) {
        let time = `${hours} ${hours > 1 ? "hours" : "hour"}`;
        const rem = mins - (hours * 60);
        if (rem > 0)
            time += ` ${rem} ${rem > 1 ? "minutes" : "minute"}`;
        return time;
    }
    if (mins) {
        return `${mins} ${mins > 1 ? "minutes" : "minute"}`;
    }
    if (seconds) {
        return `${seconds} ${seconds > 1 ? "seconds" : "second"}`;
    }
    return "";
};
exports.calcPeriod = calcPeriod;
const checkRedirectUri = (request) => {
    const cookies = request.headers.cookie;
    const obj = {};
    if (cookies === "" || cookies === undefined)
        return null;
    const removedSpaces = cookies.split(" ").join("");
    const separated = removedSpaces.split(";");
    for (let i = 0; i < separated.length; i++) {
        const split = separated[i].split("=");
        if (split[0] !== "REDIRECT_URI")
            continue;
        obj[split[0]] = split[1];
    }
    const uri = obj["REDIRECT_URI"];
    return (uri &&
        uri.replace(/%2F/g, "/").replace(/%3F/g, "?").
            replace(/%3D/g, "=").replace(/%26/g, "&")) || null;
};
exports.checkRedirectUri = checkRedirectUri;
exports.defaultAccess = 20 * 60;
exports.timezone = "Asia/Singapore";
exports.accessTokenExpiry = "1h";
exports.refreshTokenExpiry = "30d";
exports.issuer = "StudioMusic";
exports.buildroot = "builds";
//# sourceMappingURL=utils.js.map