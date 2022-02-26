"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../helpers/utils");
const responsehandler_1 = require("../helpers/responsehandler");
const functions_1 = require("./functions");
const router = (0, express_1.Router)();
const ADMIN_ACCESS = (0, utils_1.ENV)("ADMIN_ACCESS");
const accessCheck = (request, response, next) => {
    const auth = request.headers.authorization;
    if (auth !== ADMIN_ACCESS) {
        return response.status(500).send({
            message: "Invalid admin access"
        });
    }
    return next();
};
router.use(accessCheck);
router.post("/update", (0, responsehandler_1.responseMid)(functions_1.update));
router.get("/getuser", (0, responsehandler_1.responseMid)(functions_1.getUser));
router.get("/album", (0, responsehandler_1.responseMid)(functions_1.getAlbum));
router.delete("/deleteFromRecents", (0, responsehandler_1.responseMid)(functions_1.deleteAlbumFromRecents));
router.get("/fixJson", (0, responsehandler_1.responseMid)(functions_1.fixJson));
router.use("*", (_, response) => {
    return response.status(404).end();
});
exports.default = router;
//# sourceMappingURL=index.js.map