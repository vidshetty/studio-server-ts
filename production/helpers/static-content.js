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
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
// static assets file handler
router.get([
    "/mobile/assets/static/*",
    "/main/assets/static/*",
    "/player/assets/static/*"
], (req, res, next) => {
    const url = req.path;
    const url_split = url.split("/");
    const folder_name = (() => {
        if (url.includes("/css"))
            return "css";
        if (url.includes("/js"))
            return "js";
        if (url.includes("/media"))
            return "media";
        return null;
    })();
    const build_name = (() => {
        if (url_split[1] === "mobile")
            return "mobile-build";
        if (url_split[1] === "main")
            return "main-build";
        if (url_split[1] === "player")
            return "player-build";
        return null;
    })();
    if (folder_name === null || build_name === null) {
        return res.status(404).end();
    }
    const file_path = path_1.default.join(process.cwd(), utils_1.buildroot, build_name, "static", folder_name, url_split[url_split.length - 1]);
    if (!fs_1.default.existsSync(file_path))
        return res.status(404).end();
    return res.status(200).sendFile(file_path);
});
// global assets file handler
router.get([
    "/mobile/assets/*",
    "/main/assets/*",
    "/player/assets/*"
], (req, res, next) => {
    const url_split = req.path.split("/");
    const file_path = path_1.default.join(process.cwd(), utils_1.buildroot, "player-build", url_split[url_split.length - 1]);
    if (!fs_1.default.existsSync(file_path))
        return res.status(404).end();
    return res.status(200).sendFile(file_path);
});
// main index html
router.get("/", middlewares_1.userAgentCheck, (req, res, next) => {
    const file_path = path_1.default.join(process.cwd(), utils_1.buildroot, "main-build", "index.html");
    if (!fs_1.default.existsSync(file_path))
        return res.status(404).end();
    return res.status(200).sendFile(file_path);
});
// player index html
router.get([
    "/player",
    "/player/search",
    "/player/album/:albumId",
    "/player/album/:albumId/playable",
    "/player/track/:albumId/:trackId",
    "/player/track/:albumId/:trackId/playable"
], middlewares_1.userAgentCheck, functions_1.rootAuthCheck, functions_1.rootAccessCheck, (req, res, next) => {
    const { result } = req;
    if (!result.found) {
        (0, utils_1.setRedirectUriCookie)(req.url, res);
        return res.redirect("/");
    }
    const file_path = path_1.default.join(process.cwd(), utils_1.buildroot, "player-build", "index.html");
    if (!fs_1.default.existsSync(file_path))
        return res.status(404).end();
    return res.status(200).sendFile(file_path);
    // if (
    //     request.path === "/player" ||
    //     request.path === "/player/search"
    // ) {
    //     if (!result.found) {
    //         setRedirectUriCookie(request.url, response);
    //         return response.redirect("/");
    //     }
    //     return response.sendFile(path.join(process.cwd(), buildroot, "player-build", "index.html"));
    // }
    // else {
    //     if (!result.found) setRedirectUriCookie(request.url, response);
    //     const data: string = await updateHtmlHead(request);
    //     return response.send(data);
    // }
});
// player redirect
router.get("/player*", (req, res, next) => {
    return res.redirect("/player");
});
// mobile index html
router.get("/mobileview", (req, res, next) => {
    const file_path = path_1.default.join(process.cwd(), utils_1.buildroot, "mobile-build", "index.html");
    if (!fs_1.default.existsSync(file_path))
        return res.status(404).end();
    return res.status(200).sendFile(file_path);
});
// google sign in
router.get("/google-signin", passport_1.default.authenticate("google", { failureRedirect: "/login?status=failed", session: false }), functions_1.googleAuthCheck, (req, res, next) => {
    if (res.user.error) {
        return res.redirect("/login?status=success&email=exists");
    }
    return res.redirect(`/google-oauth-signin/${res.user._id}`);
});
// google auth
router.get("/google-oauth-signin/*", middlewares_1.userAgentCheck, (req, res, next) => {
    const file_path = path_1.default.join(process.cwd(), utils_1.buildroot, "build", "index.html");
    if (!fs_1.default.existsSync(file_path))
        return res.status(404).end();
    return res.status(200).sendFile(file_path);
});
// anything else
router.get("/*", (req, res, next) => {
    return res.redirect("/");
});
exports.default = router;
//# sourceMappingURL=static-content.js.map