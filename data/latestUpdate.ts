import path from "path";


export const LATEST_APP_UPDATE = {
    "DEBUG": {
        "versionCode": 4,
        "versionName": "1.0.0",
        "filename": "studiomusic-debug-4-1.0.0.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-debug-4-1.0.0.apk")
    },
    "RELEASE": {
        "versionCode": 8,
        "versionName": "1.0.2",
        "filename": "studiomusic-release-8-1.0.2.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-release-8-1.0.2.apk")
    }
};