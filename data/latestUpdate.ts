import path from "path";


export const LATEST_APP_UPDATE = {
    "DEBUG": {
        "versionCode": 4,
        "versionName": "1.0.0",
        "filename": "studiomusic-debug-4-1.0.0.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-debug-4-1.0.0.apk")
    },
    "RELEASE": {
        "versionCode": 12,
        "versionName": "1.0.6",
        "filename": "studiomusic-release-12-1.0.6.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-release-12-1.0.6.apk")
    }
};