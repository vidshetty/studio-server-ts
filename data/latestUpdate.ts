import path from "path";


export const LATEST_APP_UPDATE = {
    "DEBUG": {
        "versionCode": 4,
        "versionName": "1.0.0",
        "filename": "studiomusic-debug-4-1.0.0.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-debug-4-1.0.0.apk")
    },
    "RELEASE": {
        "versionCode": 16,
        "versionName": "1.1.1",
        "filename": "studiomusic-release-16-1.1.1.apk",
        "filePath": path.join(process.cwd(), "builds", "apk", "studiomusic-release-16-1.1.1.apk")
    }
};