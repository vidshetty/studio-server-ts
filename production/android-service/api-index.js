"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const functions_1 = require("../auth-service/functions");
const responsehandler_1 = require("../helpers/responsehandler");
const functions_2 = require("../api-service/functions");
const api_functions_1 = require("./api-functions");
const router = (0, express_1.Router)();
router.get("/checkServer", (0, responsehandler_1.responseMid)(api_functions_1.checkServer));
router.use(functions_1.androidApiAuthCheck);
router.get("/whosthis", (0, responsehandler_1.responseMid)(functions_2.getProfile));
router.use(functions_1.androidApiAccessCheck);
router.get("/recordTime", (0, responsehandler_1.responseMid)(functions_2.recordTime));
router.get("/getHomeAlbums", (0, responsehandler_1.responseMid)(functions_2.homeAlbums));
router.get("/getLibrary", (0, responsehandler_1.responseMid)(api_functions_1.getLibrary));
router.get("/getTrack", (0, responsehandler_1.responseMid)(functions_2.getTrackDetails));
router.get("/getAlbumDetails", (0, responsehandler_1.responseMid)(functions_2.getAlbumDetails));
router.get("/search", (0, responsehandler_1.responseMid)(functions_2.search));
router.post("/addToRecentlyPlayed", (0, responsehandler_1.responseMid)(functions_2.addToRecentlyPlayed));
router.get("/getLyrics", (0, responsehandler_1.responseMid)(functions_2.getLyrics));
router.get("/sign-out", (0, responsehandler_1.responseMid)(functions_2.signOut));
router.get("/startradio", (0, responsehandler_1.responseMid)(functions_2.startRadio));
router.get("/activeSessions", (0, responsehandler_1.responseMid)(api_functions_1.activeSessions));
router.use("*", (_, response) => {
    return response.status(404).end();
});
exports.default = router;
//# sourceMappingURL=api-index.js.map