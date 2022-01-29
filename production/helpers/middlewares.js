"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipAddress = exports.httpsRedirect = exports.userAgentCheck = void 0;
const geoip_lite_1 = require("geoip-lite");
const userAgentCheck = (request, response, next) => {
    const ua = (request.headers["user-agent"] || "").toLowerCase();
    let found = false;
    const notAllowed = [
        "android",
        "ios",
        "mobile"
    ];
    for (let i = 0; i < notAllowed.length; i++) {
        if (ua.includes(notAllowed[i])) {
            found = true;
            break;
        }
    }
    if (found)
        return response.redirect("/mobileview");
    return next();
};
exports.userAgentCheck = userAgentCheck;
const httpsRedirect = (request, response, next) => {
    const allowedHosts = [
        "localhost:5000",
        "192.168.29.77:5000",
        "localhost:7000",
        "192.168.29.77:7000"
    ];
    const protocol = request.headers["x-forwarded-proto"] || "";
    const host = request.headers["host"] || "";
    const isHttps = protocol === "https";
    let validHost = false;
    for (let i = 0; i < allowedHosts.length; i++) {
        if (allowedHosts[i] === host) {
            validHost = true;
            break;
        }
    }
    if (validHost)
        return next();
    if (!isHttps)
        return response.redirect(`https://${host}${request.url}`);
    return next();
};
exports.httpsRedirect = httpsRedirect;
const ipAddress = (request, response, next) => {
    try {
        const ip = request.headers["x-forwarded-for"] || "no 'x-forwarded-for' header";
        const ipData = (0, geoip_lite_1.lookup)(ip);
        // console.log(
        //     "IP address",
        //     ip,
        //     `${(ipData && ipData.city) || "no city"}, ${ipData && ipData.country}`
        // );
    }
    catch (e) {
    }
    finally {
        return next();
    }
};
exports.ipAddress = ipAddress;
//# sourceMappingURL=middlewares.js.map