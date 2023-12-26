"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LATEST_APP_UPDATE = void 0;
const path_1 = __importDefault(require("path"));
exports.LATEST_APP_UPDATE = {
    "DEBUG": {
        "versionCode": 4,
        "versionName": "1.0.0",
        "filename": "studiomusic-debug-4-1.0.0.apk",
        "filePath": path_1.default.join(process.cwd(), "builds", "apk", "studiomusic-debug-4-1.0.0.apk")
    },
    "RELEASE": {
        "versionCode": 8,
        "versionName": "1.0.3",
        "filename": "studiomusic-release-8-1.0.3.apk",
        "filePath": path_1.default.join(process.cwd(), "builds", "apk", "studiomusic-release-8-1.0.3.apk")
    }
};
//# sourceMappingURL=latestUpdate.js.map