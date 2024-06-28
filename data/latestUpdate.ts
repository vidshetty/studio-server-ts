import path from "path";


export const LATEST_APP_UPDATE = {
    "DEBUG": {
        "versionCode": 4,
        "versionName": "1.0.0",
        "filename": "studiomusic-debug-4-1.0.0.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-debug-4-1.0.0.apk")
    },
    "RELEASE": {
        "versionCode": 11,
        "versionName": "1.0.5",
        "filename": "studiomusic-release-11-1.0.5.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-release-11-1.0.5.apk")
    }
};