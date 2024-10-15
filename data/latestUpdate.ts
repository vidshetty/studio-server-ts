import path from "path";


export const LATEST_APP_UPDATE = {
    "DEBUG": {
        "versionCode": 4,
        "versionName": "1.0.0",
        "filename": "studiomusic-debug-4-1.0.0.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-debug-4-1.0.0.apk")
    },
    "RELEASE": {
        "versionCode": 14,
        "versionName": "1.1.0",
        "filename": "studiomusic-release-14-1.1.0.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-release-14-1.1.0.apk")
    }
};