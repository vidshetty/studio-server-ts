"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../helpers/middlewares");
const functions_1 = require("../auth-service/functions");
const utils_1 = require("../helpers/utils");
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const staticrouter_1 = __importDefault(require("./staticrouter"));
const playerstaticrouter_1 = __importDefault(require("./playerstaticrouter"));
const router = (0, express_1.Router)();
const exists = (file, path) => {
    return path.includes(file);
};
const getpath = (file) => {
    return path_1.default.join(process.cwd(), utils_1.buildroot, "player-build", file);
};
router.use("/static", staticrouter_1.default);
router.use([
    "/player/static",
    "/player/album/static",
    "/player/album/*/static",
    "/player/track/*/static"
], playerstaticrouter_1.default);
router.get("/*", (request, response, next) => {
    let returnpath = null;
    if (exists("latest-bluewhite.png", request.path))
        returnpath = getpath("latest-bluewhite.png");
    if (exists("latest-bluewhite.svg", request.path))
        returnpath = getpath("latest-bluewhite.svg");
    if (exists("latest-bluetransparent.png", request.path))
        returnpath = getpath("latest-bluetransparent.png");
    if (exists("latest-bluetransparent.svg", request.path))
        returnpath = getpath("latest-bluetransparent.svg");
    if (exists("latest-blueblack.png", request.path))
        returnpath = getpath("latest-blueblack.png");
    if (exists("latest-blueblack.svg", request.path))
        returnpath = getpath("latest-blueblack.svg");
    if (exists("latest-blueblack.jpg", request.path))
        returnpath = getpath("latest-blueblack.jpg");
    if (exists("latest-blueblack.ico", request.path))
        returnpath = getpath("latest-blueblack.ico");
    if (exists("16x16.png", request.path))
        returnpath = getpath("16x16.png");
    if (exists("32x32.png", request.path))
        returnpath = getpath("32x32.png");
    if (exists("192x192.png", request.path))
        returnpath = getpath("192x192.png");
    if (exists("manifest.json", request.url))
        returnpath = getpath("manifest.json");
    if (exists("registerSW.js", request.url))
        returnpath = getpath("registerSW.js");
    if (exists("sw.js", request.url))
        returnpath = getpath("sw.js");
    if (!returnpath)
        return next();
    else
        return response.sendFile(returnpath);
});
router.get("/google-oauth-signin/*", middlewares_1.userAgentCheck, middlewares_1.httpsRedirect, (_, response) => {
    return response.sendFile(path_1.default.join(process.cwd(), utils_1.buildroot, "build", "index.html"));
});
router.get("/google-signin", passport_1.default.authenticate("google", { failureRedirect: "/login?status=failed" }), functions_1.googleAuthCheck, (_, response) => {
    if (response.user.error) {
        return response.redirect("/login?status=success&email=exists");
    }
    return response.redirect(`/google-oauth-signin/${response.user._id}`);
});
router.get([
    "/player",
    "/player/album/*",
    "/player/track/:albumId/:trackId",
    "/player/track/:albumId/:trackId/*",
    "/player/search"
], middlewares_1.ipAddress, middlewares_1.userAgentCheck, middlewares_1.httpsRedirect, functions_1.rootAuthCheck, functions_1.rootAccessCheck, (request, response) => {
    const { result } = request;
    if (!result.found) {
        (0, utils_1.setRedirectUriCookie)(request.url, response);
        return response.redirect("/");
    }
    return response.sendFile(path_1.default.join(process.cwd(), utils_1.buildroot, "player-build", "index.html"));
});
router.get("/", middlewares_1.ipAddress, middlewares_1.userAgentCheck, middlewares_1.httpsRedirect, (_, response) => {
    return response.sendFile(path_1.default.join(process.cwd(), utils_1.buildroot, "build", "index.html"));
});
router.get("/player*", (_, response) => {
    return response.redirect("/player");
});
router.get("/mobileview", middlewares_1.httpsRedirect, (_, response) => {
    return response.sendFile(path_1.default.join(process.cwd(), utils_1.buildroot, "mobile-build", "index.html"));
});
router.get("/*", (_, response) => {
    return response.redirect("/");
});
exports.default = router;
//# sourceMappingURL=static-content.js.map