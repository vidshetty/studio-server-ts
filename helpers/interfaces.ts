import { Document } from "mongoose";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";


export interface Track {
    _trackId: string;
    Title: string;
    Artist: string;
    Duration: string;
    url: string;
    streamCount?: number;
    lyrics?: boolean;
    sync?: boolean;
};

export interface Album {
    _albumId: string;
    Album: string;
    AlbumArtist: string;
    Type: "Album";
    Year: string;
    Color: string;
    LightColor?: string;
    DarkColor?: string;
    releaseDate: Date;
    Thumbnail: string;
    Tracks: Track[];
};

export interface Single {
    _albumId: string;
    _trackId: string;
    Album: string;
    AlbumArtist: string;
    Type: "Single";
    Year: string;
    Color: string;
    LightColor?: string;
    DarkColor?: string;
    releaseDate: Date;
    Thumbnail: string;
    Artist: string;
    Duration: string;
    url: string;
    lyrics?: boolean;
    sync?: boolean;
};

export type AlbumList = Single | Album;
export type ModifiedAlbumList = AlbumList & { keyId: number };
export type AlbumWithTrack = Album & Track;

export interface NodemailerOptions {
    from?: string;
    to: string;
    subject: string;
    html: string;
};

export interface AlbumlistMap {
    [key: string]: Single | Album;
}

export interface CookieInterface {
    ACCOUNT?: string;
    ACCOUNT_REFRESH?: string;
    REDIRECT_URI?: string;
};

export interface Lyrics {
    from: number;
    to: number;
    text: string;
    key: number;
}

export interface SpotifyLyrics {
    startTimeMs: number;
    words: string;
    key: number;
}

export interface JwtPayload extends jwt.JwtPayload {
    _id: string;
    email: string;
    sessionId: string|null;
}

export interface GoogleProfileInfo {
    exists: boolean;
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
}

export interface RecentlyPlayed {
    albumId: string;
    frequency: number;
    last: Date;
}

export interface ActiveSession {
    seen: boolean;
    device: string|null;
    sessionId: string;
    lastUsed: string;
}

export interface DeviceInfo {
    manufacturer: string;
    device: string;
    brand: string;
    model: string;
}

export interface InstalledVersion {
    versionCode: number;
    versionName: string;
    buildType: string;
}

export interface UserInterface extends Document {
    username: string | null;
    email: {
        id: string;
        verificationStatus: string;
        uuid?: string;
        uuidExpiry?: Date;
    };
    password: {
        key: string;
        uuid?: string;
        uuidExpiry?: Date;
    };
    googleAccount: GoogleProfileInfo;
    accountAccess: {
        duration: number;
        timeLimit: Date;
        type: string;
        uid?: string;
    };
    loggedIn: string;
    recentsLastModified: Date;
    recentlyPlayed: RecentlyPlayed[];
    status: string;
    activeSessions: ActiveSession[];
    installedVersion: InstalledVersion | null
    // recentlySearched: {
    //     type: Array,
    //     default: []
    // }
};

export interface FoundResponse {
    found?: boolean;
    id: string | null;
    user?: UserInterface | null;
    accessToken?: string | null;
    sessionId?: string | null;
};

export interface RefreshTokenResponse {
    id: string | null;
    accessToken: string | null;
};

export interface RequestQuery{
    page?: string;
    albumId?: string;
    trackId?: string;
    name?: string;
    exclude?: string;
    type?: string;
    versionCode?: string;
    versionName?: string;
    buildType?: string;
};

export interface AndroidAlbum {
    _albumId: string;
    Album: string;
    AlbumArtist: string;
    Type: string;
    Year: string;
    Color: string;
    LightColor?: string | null;
    DarkColor?: string | null;
    releaseDate: Date;
    Thumbnail: string;
    Tracks: Track[];
};

export interface AndroidTrack {
    _albumId: string;
    Album: string;
    Year: string;
    Type: string;
    Color: string;
    LightColor?: string | null;
    DarkColor?: string | null;
    releaseDate: Date;
    Thumbnail: string;
    _trackId: string;
    Title: string;
    Artist: string;
    Duration: string;
    url: string;
    streamCount: number;
    lyrics?: boolean;
    sync?: boolean;
};


export interface AccountEntry {
    _id: ObjectId;
    date: Date;
    category: string;
    description: string;
    amount: number;
};