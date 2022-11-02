"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const responsehandler_1 = require("../helpers/responsehandler");
const auth_functions_1 = require("./auth-functions");
const router = (0, express_1.Router)();
// router.post("/sign-out", responseMid(signOut));
// router.post("/oauth-check", responseMid(oauthCheck));
// router.post("/continue-oauth-signin", responseMid(continueAuthSignin));
// router.get("/request-access", responseMid(requestAccess));
// router.get("/server-type", responseMid(servertypes));
router.post("/accountCheck", (0, responsehandler_1.responseMid)(auth_functions_1.accountCheck));
router.post("/accessCheck", (0, responsehandler_1.responseMid)(auth_functions_1.accessCheck));
router.use("*", (_, response) => {
    return response.status(404).end();
});
exports.default = router;
//# sourceMappingURL=auth-index.js.map