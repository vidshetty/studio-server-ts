"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
(0, dotenv_1.config)({ path: path_1.default.join(process.cwd(), "ENV", ".env") });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const http_1 = __importDefault(require("http"));
require("./nodemailer-service");
require("./passport-service");
const static_content_1 = __importDefault(require("./helpers/static-content"));
const mongohandler_1 = __importDefault(require("./helpers/mongohandler"));
const corshandler_1 = __importDefault(require("./helpers/corshandler"));
const auth_service_1 = __importDefault(require("./auth-service"));
const api_service_1 = __importDefault(require("./api-service"));
const admin_service_1 = __importDefault(require("./admin-service"));
const app = (0, express_1.default)();
const PORT = 5000;
const server = http_1.default.createServer(app);
(0, mongohandler_1.default)();
app.use(passport_1.default.initialize());
app.use(corshandler_1.default);
app.use(express_1.default.json());
app.use("/admin", admin_service_1.default);
app.use("/api/auth", auth_service_1.default);
app.use("/api", api_service_1.default);
app.get("/login/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"]
}));
app.use("/", static_content_1.default);
server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map