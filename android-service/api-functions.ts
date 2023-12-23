import { Request, Response } from "express";
import {
    UserInterface,
    AndroidAlbum,
    Album,
    Single,
    RecentlyPlayed,
    AndroidTrack,
    RequestQuery
} from "../helpers/interfaces";
import {
    server,
    randomize,
    convertToAndroidAlbum,
    BUILD_TYPE
} from "../helpers/utils";
import { Users } from "../models/Users";
import ALBUMLIST, { NewReleases, RecentlyAdded, ALBUM_MAP, ALBUM_LIST_TRACKS } from "../data/archiveGateway";
import { LATEST_APP_UPDATE } from "../data/latestUpdate";



const getMostPlayed = async (userId: string): Promise<AndroidAlbum[]> => {

    const user: UserInterface = await Users.findOne({ _id: userId }).lean();

    const { recentlyPlayed: recents } = user;

    const sorted_recents = recents.sort((a: RecentlyPlayed, b: RecentlyPlayed) => {
        if (a.last < b.last) return 1;
        return -1;
    });

    const top_recents = sorted_recents.slice(0,6);
    if (top_recents.length < 6) return [];

    return top_recents.reduce<AndroidAlbum[]>((albums: AndroidAlbum[], each) => {
        const album = ALBUM_MAP[each.albumId] || null;
        if (album) albums.push(...convertToAndroidAlbum([album]));
        return albums;
    }, []);

};

const getQuickPicks = (): AndroidTrack[] => {

    const final: AndroidTrack[] = [];
    const uniqNums: number[] = [];

    for (let i=1; i<=12; i++) {
        let gotUniqueRandomNum = false, rand: number = 0;
        while (!gotUniqueRandomNum) {
            rand = Math.floor(Math.random() * ALBUM_LIST_TRACKS.length);
            if (!uniqNums.includes(rand)) {
                uniqNums.push(rand);
                gotUniqueRandomNum = true;
            }
        }
        final.push(ALBUM_LIST_TRACKS[rand]);
    }

    return final;

};

const getSongs = (name: string): AndroidTrack[] => {

    const lower = name.toLowerCase();

    const tracks = ALBUM_LIST_TRACKS.reduce<AndroidTrack[]>((acc: AndroidTrack[], track) => {

        const in_title = track.Title.toLowerCase().includes(lower);
        const in_artists = track.Artist.toLowerCase().includes(lower);
        const in_artists_2 = (track.Artist.replace(/$/g, "s")).toLowerCase().includes(lower);
        const in_albumname = track.Album.toLowerCase().includes(lower);

        if (in_title || in_albumname || in_artists || in_artists_2) {
            acc.push(track);
        }

        return acc;

    }, []);

    if (tracks.length <= 50) return tracks;

    const final: AndroidTrack[] = [];
    const uniqNums: number[] = [];

    for (let i=1; i<=50; i++) {
        let gotUniqueRandomNum = false, rand: number = 0;
        while (!gotUniqueRandomNum) {
            rand = Math.floor(Math.random() * tracks.length);
            if (!uniqNums.includes(rand)) {
                uniqNums.push(rand);
                gotUniqueRandomNum = true;
            }
        }
        final.push(tracks[rand]);
    }

    return final;

};

const getAlbums = (name: string): AndroidAlbum[] => {

    const lower = name.toLowerCase();

    const ANDROID_ALBUMS = convertToAndroidAlbum(ALBUMLIST);

    const albums = ANDROID_ALBUMS.reduce<AndroidAlbum[]>((acc: AndroidAlbum[], album) => {

        const in_tracktitles = album.Tracks.reduce<boolean>((acc: boolean, track) => {
            if (track.Title.toLowerCase().includes(lower)) {
                acc = true;
            }
            return acc;
        }, false);

        const in_albumartists = album.AlbumArtist.toLowerCase().includes(lower);
        const in_albumname = album.Album.toLowerCase().includes(lower);

        if (in_tracktitles || in_albumartists || in_albumname) {
            acc.push(album);
        }

        return acc;

    }, []);

    if (albums.length <= 50) return albums;

    const final: AndroidAlbum[] = [];
    const uniqNums: number[] = [];

    for (let i=1; i<=50; i++) {
        let gotUniqueRandomNum = false, rand: number = 0;
        while (!gotUniqueRandomNum) {
            rand = Math.floor(Math.random() * albums.length);
            if (!uniqNums.includes(rand)) {
                uniqNums.push(rand);
                gotUniqueRandomNum = true;
            }
        }
        final.push(albums[rand]);
    }

    return final;

};



export const checkServer = (req: Request) => {

    return { status: "active", server };

};

export const activeSessions = async (request: Request) => {

    const { id = null } = request.ACCOUNT;
    const { sessionId = null } = request.result;

    const user: UserInterface | null = await Users.findOne({ _id: id });

    if (!user) return [];

    const { activeSessions = [] } = user;

    return activeSessions.map(each => {
        const obj: any = { ...each };
        obj.thisDevice = each.sessionId === sessionId;
        return obj;
    });

};

export const getLibrary = async (request: Request) => {

    const { page = "1" } = request.query as unknown as { page: string };

    const start = parseInt(page) - 1;
    const no = 7*7;

    const allAlbums = convertToAndroidAlbum(ALBUMLIST);

    const sublibrary: AndroidAlbum[] = allAlbums.slice(start*no, (start*no) + no);
    const random: AndroidAlbum[] = (randomize(sublibrary) as AndroidAlbum[]);

    return {
        more: (() => {
            if ((start*no)+no === allAlbums.length) return false;
            if (sublibrary.length < no) return false;
            return true;
        })(),
        data: random
    };

};

export const getAlbum = async (request: Request) => {

    const { albumId = "" } = request.query as unknown as { albumId: string };

    const album = ALBUMLIST.find(each => each._albumId === albumId);

    if (!album) return null;

    return {
        _albumId: album._albumId,
        Album: album.Album,
        AlbumArtist: album.AlbumArtist,
        Type: album.Type,
        Year: album.Year,
        Color: album.Color,
        Thumbnail: album.Thumbnail,
        releaseDate: album.releaseDate,
        Tracks: (() => {
            if (album.Type === "Album") {
                return (album as Album).Tracks.map(track => {
                    track.lyrics = track.lyrics || false;
                    track.sync = track.sync || false;
                    return track;
                });
            }
            if (album.Type === "Single") {
                const single = (album as Single);
                return [{
                    _trackId: single._trackId,
                    Title: single.Album,
                    Artist: single.Artist,
                    Duration: single.Duration,
                    url: single.url,
                    lyrics: single.lyrics || false,
                    sync: single.sync || false
                }];
            }
            return [];
        })()
    };

};

export const homeAlbums = async (request: Request, _:any) => {

    const { id: userId } = request.ACCOUNT;

    const mostPlayed = await getMostPlayed(userId);

    const homeList: { [key: string]: AndroidAlbum[] } = {};

    homeList["New Releases"] = convertToAndroidAlbum(NewReleases);

    homeList["Recently Added"] = convertToAndroidAlbum(RecentlyAdded);

    return { albums: homeList, mostPlayed, quickPicks: getQuickPicks() };

};

export const search = async (request: Request, _:any): Promise<{ tracks:Array<AndroidTrack>, albums:Array<AndroidAlbum>, artists:Array<any> }> => {

    const { name }: RequestQuery = request.query as unknown as RequestQuery;

    if (!name) return { tracks: [], albums: [], artists: [] };

    const tracks: AndroidTrack[] = getSongs(name);
    const albums: AndroidAlbum[] = getAlbums(name);

    return { tracks, albums, artists: [] };

};

export const startRadio = async (request: Request, _:any) => {

    const { exclude: toBeExcludedTrackId = "" }: RequestQuery = request.query as unknown as RequestQuery;

    const randomNumberCounter: { [key: number]: boolean } = {};

    const finalArr = [];

    let rand: number, done: boolean;

    const songlist = ALBUM_LIST_TRACKS.filter(song => {
        return String(song._trackId) !== String(toBeExcludedTrackId);
    });

    const len = songlist.length;

    for (let i=0; i<75; i++) {
        done = false;
        let limit = 3;
        while(!done) {
            if (limit === 0) break;
            else limit--;
            rand = Math.floor(Math.random() * len);
            if (!randomNumberCounter[rand]) {
                finalArr.push(songlist[rand]);
                randomNumberCounter[rand] = true;
                done = true;
            }
        }
    };

    return finalArr;
    
};

export const getMostPlayedRadio = async (request: Request, _: any) => {

    const { exclude: toBeExcludedAlbumId = "" } = request.query as unknown as RequestQuery;
    const { id: userId } = request.ACCOUNT;

    const user: UserInterface | null = await Users.findOne({ _id: userId });
    if (!user) return [];

    const { recentlyPlayed: recents } = user;
    const recentsAlbumIdsMap = recents.reduce<{ [key: string]: boolean }>((acc,each) => {
        acc[String(each.albumId)] = true;
        return acc;
    }, {});

    const tracks = ALBUM_LIST_TRACKS.filter(each => {
        const cond1 = String(each._albumId) !== String(toBeExcludedAlbumId);
        const cond2 = recentsAlbumIdsMap[String(each._albumId)] || false;
        return cond1 && cond2;
    });

    const len: number = tracks.length;

    const final: AndroidTrack[] = [];
    const randomNumberCounter: { [key: number]: boolean } = {};
    let done: boolean;

    for (let i=0; i<50; i++) {
        done = false;
        let limit = 3;
        while(!done) {
            if (limit === 0) break;
            else limit--;
            const rand = Math.floor(Math.random() * len);
            if (!randomNumberCounter[rand]) {
                final.push(tracks[rand]);
                randomNumberCounter[rand] = true;
                done = true;
            }
        }
    };

    return final;

};

export const checkForUpdates = async (request: Request, _:any) => {

    const {
        versionCode = null,
        versionName = null,
        buildType = null
    } = request.query as unknown as RequestQuery;
    const { id: userId } = request.ACCOUNT;

    if (versionCode === null || versionName === null || buildType === null) {
        throw new Error("incomplete version details!");
    }

    const user: UserInterface | null = await Users.findOne({ _id: userId });
    if (user === null) {
        throw new Error("user not found!");
    }

    user.installedVersion = {
        versionCode: Number(versionCode),
        versionName,
        buildType
    };

    await user.save();

    const updateAvailable = (() => {
        if (buildType === BUILD_TYPE.DEBUG) {
            return (
                Number(versionCode) < LATEST_APP_UPDATE.DEBUG.versionCode ||
                versionName !== LATEST_APP_UPDATE.DEBUG.versionName
            );
        }
        if (buildType === BUILD_TYPE.RELEASE) {
            return (
                Number(versionCode) < LATEST_APP_UPDATE.RELEASE.versionCode ||
                versionName !== LATEST_APP_UPDATE.RELEASE.versionName
            )
        }
        return false;
    })();

    return { updateAvailable };

};

export const downloadLatestUpdate = async (request: Request, response: Response) => {

    const { buildType = BUILD_TYPE.RELEASE } = request.query as unknown as RequestQuery;

    const filename = buildType === BUILD_TYPE.DEBUG ?
        LATEST_APP_UPDATE.DEBUG.filename :
        LATEST_APP_UPDATE.RELEASE.filename;

    const filePath = buildType === BUILD_TYPE.DEBUG ?
        LATEST_APP_UPDATE.DEBUG.filePath :
        LATEST_APP_UPDATE.RELEASE.filePath;

    response.setHeader("Content-Disposition", "attachment;filename=" + filename);
    response.sendFile(filePath);

};