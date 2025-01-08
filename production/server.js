"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
(0, dotenv_1.config)({ path: path_1.default.join(process.cwd(), "ENV", ".env") });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
require("./nodemailer-service");
require("./passport-service");
const static_content_1 = __importDefault(require("./helpers/static-content"));
const mongohandler_1 = __importDefault(require("./helpers/mongohandler"));
const corshandler_1 = __importDefault(require("./helpers/corshandler"));
const auth_service_1 = __importDefault(require("./auth-service"));
const api_service_1 = __importDefault(require("./api-service"));
const admin_service_1 = __importDefault(require("./admin-service"));
const android_service_1 = __importDefault(require("./android-service"));
const finance_service_1 = __importDefault(require("./finance-service"));
const db_connection_1 = require("./helpers/db-connection");
const mongodb_connection_1 = require("./helpers/mongodb-connection");
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || "5002");
const PROTOCOL = process.env.PROTOCOL || "http";
(async () => {
    (0, mongohandler_1.default)();
    db_connection_1.MongoAccountsHandler.initialize();
    await mongodb_connection_1.MongoStudioHandler.initialize();
    app.use(passport_1.default.initialize());
    app.use(corshandler_1.default);
    app.use(express_1.default.json());
    app.options("*", (_, res) => {
        return res.status(200).end();
    });
    app.use("/admin", admin_service_1.default);
    app.use("/api/auth", auth_service_1.default);
    app.use("/api", api_service_1.default);
    app.use("/android", android_service_1.default);
    app.use("/finance/accounts", finance_service_1.default);
    app.get("/login/google", passport_1.default.authenticate("google", {
        scope: ["profile", "email"],
        session: false
    }));
    app.get("/.well-known/assetlinks.json", (_, response) => {
        const file_path = path_1.default.join(process.cwd(), "data", "assetlinks.json");
        response.setHeader("Content-Type", "application/json");
        response.sendFile(file_path);
    });
    app.use("/", static_content_1.default);
    if (PROTOCOL === "http") {
        http_1.default
            .createServer(app)
            .listen(PORT, () => {
            console.log(`Running on http port ${PORT}`);
        });
    }
    else {
        https_1.default.createServer({
            key: fs_1.default.readFileSync(path_1.default.join(process.cwd(), "CERTIFICATES", "key.pem")),
            cert: fs_1.default.readFileSync(path_1.default.join(process.cwd(), "CERTIFICATES", "cert.pem"))
        }, app)
            .listen(PORT, () => {
            console.log(`Running on https port ${PORT}`);
        });
    }
    // server.listen(PORT, () => {
    //     console.log(`Running on port ${PORT}`);
    // });
})();
//# sourceMappingURL=server.js.map