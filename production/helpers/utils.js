"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToAndroidTrack = exports.convertToAndroidAlbum = exports.randomize = exports.getCurrentTime = exports.CustomError = exports.getDevice = exports.writeFileAsync = exports.readFileAsync = exports.__replace = exports.checkRedirectUri = exports.calcPeriod = exports.setRedirectUriCookie = exports.redirectUriCookieConfig = exports.standardCookieConfig = exports.cookieParser = exports.server = exports.date = exports.ejsRender = exports.wait = exports.requestUrlCheck = exports.ENV = exports.BUILD_TYPE = exports.defaultUserId = exports.buildroot = exports.issuer = exports.refreshTokenExpiry = exports.accessTokenExpiry = exports.androidAccessTokenExpiry = exports.timezone = exports.defaultAccess = exports.PASSPORT_REDIRECT_APP_URL = exports.PLAYER_URL = exports.MAIN_URL = exports.APP_URL = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const ejs_1 = __importDefault(require("ejs"));
const fs_1 = __importDefault(require("fs"));
exports.APP_URL = "studiomusic.app";
exports.MAIN_URL = "https://studiomusic.app";
exports.PLAYER_URL = "https://player.studiomusic.app";
exports.PASSPORT_REDIRECT_APP_URL = "https://studiomusic.app";
exports.defaultAccess = 30 * 24 * 60 * 60;
exports.timezone = "Asia/Kolkata";
exports.androidAccessTokenExpiry = "30d";
exports.accessTokenExpiry = "1h";
exports.refreshTokenExpiry = "30d";
exports.issuer = "StudioMusic";
exports.buildroot = "builds";
exports.defaultUserId = "620e2e2693c8702fed063743";
exports.BUILD_TYPE = Object.freeze({
    DEBUG: "debug",
    RELEASE: "release"
});
const ENV = (type) => {
    return process.env[type] || "";
};
exports.ENV = ENV;
const requestUrlCheck = (req, from) => {
    const og_url = req.originalUrl;
    if (from === "android" && og_url.includes("android"))
        return true;
    if (from === "web" && !og_url.includes("android"))
        return true;
    return false;
};
exports.requestUrlCheck = requestUrlCheck;
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
    if (SERVER === "LOCAL") {
        return [
            `http://localhost:4000`,
            `http://localhost:7000`,
            `http://localhost:8000`,
            `http://localhost:9000` //3
        ];
    }
    return [
        "https://studiomusic.app",
        "https://studiomusic.app",
        "https://studiomusic.app",
        "https://studiomusic.app",
    ];
    // if (SERVER === "MAIN") {
    //     return [
    //         `https://songserver1.herokuapp.com`, //0
    //         `https://songserver2.herokuapp.com`, //1
    //         `https://songserver3.herokuapp.com`, //2
    //         `https://songserver4.herokuapp.com`  //3
    //     ];
    // }
    // if (SERVER === "BACKUP1") {
    //     return [
    //         `https://songserver1-backup1.herokuapp.com`, //0
    //         `https://songserver2-backup1.herokuapp.com`, //1
    //         `https://songserver3-backup1.herokuapp.com`, //2
    //         `https://songserver4-backup1.herokuapp.com`  //3
    //     ];
    // }
    // if (SERVER === "BACKUP2") {
    //     return [
    //         `https://songserver1-backup2.herokuapp.com`, //0
    //         `https://songserver2-backup2.herokuapp.com`, //1
    //         `https://songserver3-backup2.herokuapp.com`, //2
    //         `https://songserver4-backup2.herokuapp.com`  //3
    //     ];
    // }
    // return [];
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
        exports.APP_URL,
    maxAge: 40 * 24 * 60 * 60 * 1000,
    httpOnly: true
};
exports.redirectUriCookieConfig = {
    sameSite: "none",
    secure: true,
    domain: (0, exports.ENV)("ENVIRONMENT") === "LOCAL" ? "localhost" :
        exports.APP_URL,
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
    if (years > 0) {
        // if (years > 1) return "unlimited";
        let time = `${years} ${years > 1 ? "years" : "year"}`;
        const rem = months - (years * 12);
        if (rem > 0)
            time += ` ${rem} ${rem > 1 ? "months" : "month"}`;
        return time;
    }
    if (months > 0) {
        let time = `${months} ${months > 1 ? "months" : "month"}`;
        const rem = days - (months * 30);
        if (rem > 0)
            time += ` ${rem} ${rem > 1 ? "days" : "day"}`;
        return time;
    }
    if (days > 0) {
        let time = `${days} ${days > 1 ? "days" : "day"}`;
        const rem = hours - (days * 24);
        if (rem > 0)
            time += ` ${rem} ${rem > 1 ? "hours" : "hour"}`;
        return time;
    }
    if (hours > 0) {
        let time = `${hours} ${hours > 1 ? "hours" : "hour"}`;
        const rem = mins - (hours * 60);
        if (rem > 0)
            time += ` ${rem} ${rem > 1 ? "minutes" : "minute"}`;
        return time;
    }
    if (mins > 0) {
        return `${mins} ${mins > 1 ? "minutes" : "minute"}`;
    }
    if (seconds > 0) {
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
const __replace = (string = "", list = [], replaceWith = "") => {
    let i = 0;
    while (i < string.length) {
        if (list.includes(string[i])) {
            const sep = string.split("");
            sep[i] = replaceWith;
            string = sep.join("");
        }
        else {
            i++;
        }
    }
    return string;
};
exports.__replace = __replace;
const readFileAsync = (fileName) => {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(fileName, { encoding: "utf-8" }, (err, data) => {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};
exports.readFileAsync = readFileAsync;
const writeFileAsync = (fileName, writeData) => {
    return new Promise((resolve, reject) => {
        fs_1.default.writeFile(fileName, writeData, (err) => {
            if (err)
                reject(err);
            else
                resolve("");
        });
    });
};
exports.writeFileAsync = writeFileAsync;
const getDevice = (request) => {
    const deviceInfoString = request.headers["device-info"] || null;
    if (deviceInfoString === null)
        return request.headers["user-agent"] || null;
    const deviceInfo = JSON.parse(deviceInfoString);
    return `${deviceInfo.manufacturer} ${deviceInfo.model}`;
};
exports.getDevice = getDevice;
class CustomError extends Error {
    constructor(msg, body) {
        super(msg === null ? "" : msg);
        this.body = null;
        this.body = body;
    }
}
exports.CustomError = CustomError;
;
const getCurrentTime = () => {
    return (0, moment_timezone_1.default)().tz(exports.timezone).format("DD MMM YYYY, h:mm:ss a");
};
exports.getCurrentTime = getCurrentTime;
const randomize = (arr) => {
    let i, len = arr.length, rand;
    for (i = len - 1; i >= 0; i--) {
        rand = Math.floor(Math.random() * len);
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
};
exports.randomize = randomize;
const convertToAndroidAlbum = (arr = []) => {
    return arr.reduce((acc, each) => {
        const album = each;
        const single = each;
        acc.push({
            _albumId: each._albumId,
            Album: each.Album,
            AlbumArtist: each.AlbumArtist,
            Type: each.Type,
            Year: each.Year,
            Color: each.Color,
            LightColor: (each === null || each === void 0 ? void 0 : each.LightColor) || null,
            DarkColor: (each === null || each === void 0 ? void 0 : each.DarkColor) || null,
            Thumbnail: each.Thumbnail,
            releaseDate: each.releaseDate,
            Tracks: (() => {
                if (each.Type === "Album") {
                    return album.Tracks.map(track => {
                        track.lyrics = track.lyrics || false;
                        track.sync = track.sync || false;
                        return track;
                    });
                }
                if (each.Type === "Single") {
                    return [{
                            _trackId: single._trackId,
                            Title: single.Album,
                            Artist: single.Artist,
                            Duration: single.Duration,
                            url: single.url,
                            lyrics: single.lyrics || false,
                            sync: single.sync || false
                        }];
                }
                return [];
            })()
        });
        return acc;
    }, []);
};
exports.convertToAndroidAlbum = convertToAndroidAlbum;
const convertToAndroidTrack = (arr = []) => {
    return arr.reduce((acc, each) => {
        const album = each;
        const single = each;
        if (each.Type === "Single") {
            acc.push({
                _albumId: single._albumId,
                Album: single.Album,
                Color: single.Color,
                LightColor: (single === null || single === void 0 ? void 0 : single.LightColor) || null,
                DarkColor: (single === null || single === void 0 ? void 0 : single.DarkColor) || null,
                Thumbnail: single.Thumbnail,
                Year: single.Year,
                Type: single.Type,
                releaseDate: single.releaseDate,
                _trackId: single._trackId,
                Title: single.Album,
                Artist: single.Artist,
                Duration: single.Duration,
                url: single.url,
                lyrics: single.lyrics || false,
                sync: single.sync || false
            });
        }
        else {
            album.Tracks.forEach((track) => {
                acc.push({
                    _albumId: album._albumId,
                    Album: album.Album,
                    Color: album.Color,
                    LightColor: (single === null || single === void 0 ? void 0 : single.LightColor) || null,
                    DarkColor: (single === null || single === void 0 ? void 0 : single.DarkColor) || null,
                    Thumbnail: album.Thumbnail,
                    Year: album.Year,
                    Type: album.Type,
                    releaseDate: album.releaseDate,
                    _trackId: track._trackId,
                    Title: track.Title,
                    Artist: track.Artist,
                    Duration: track.Duration,
                    url: track.url,
                    lyrics: track.lyrics || false,
                    sync: track.sync || false
                });
            });
        }
        return acc;
    }, []);
};
exports.convertToAndroidTrack = convertToAndroidTrack;
//# sourceMappingURL=utils.js.map