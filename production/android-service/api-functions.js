"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadLatestUpdate = exports.checkForUpdates = exports.getMostPlayedRadio = exports.startRadio = exports.search = exports.homeAlbums = exports.getAlbum = exports.getLibrary = exports.activeSessions = exports.checkServer = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongodb_1 = require("mongodb");
const utils_1 = require("../helpers/utils");
const archiveGateway_1 = __importStar(require("../data/archiveGateway"));
const latestUpdate_1 = require("../data/latestUpdate");
const nodemailer_service_1 = require("../nodemailer-service");
const mongodb_connection_1 = require("../helpers/mongodb-connection");
const getMostPlayed = async (userId) => {
    const { Users } = mongodb_connection_1.MongoStudioHandler.getCollectionSet();
    const user = await Users.findOne({
        _id: new mongodb_1.ObjectId(userId)
    });
    const { recentlyPlayed: recents } = user;
    const sorted_recents = recents.sort((a, b) => {
        if (a.last < b.last)
            return 1;
        return -1;
    });
    const top_recents = sorted_recents.slice(0, 6);
    if (top_recents.length < 6)
        return [];
    const { Albums, Tracks } = mongodb_connection_1.MongoStudioHandler.getCollectionSet();
    const db_albums = await Albums.find({
        _albumId: {
            $in: lodash_1.default.map(top_recents, e => new mongodb_1.ObjectId(e.albumId))
        }
    }).toArray();
    const db_tracks = await Tracks.find({
        _albumId: {
            $in: lodash_1.default.map(top_recents, e => new mongodb_1.ObjectId(e.albumId))
        }
    }).toArray();
    return lodash_1.default.reduce(top_recents, (acc, each) => {
        var _a;
        const album = ((_a = (lodash_1.default.filter(db_albums, (a) => {
            return String(a._albumId) === String(each.albumId);
        }))) === null || _a === void 0 ? void 0 : _a[0]) || null;
        const tracks = lodash_1.default.filter(db_tracks, (t) => {
            return String(t._albumId) === String(each.albumId);
        });
        if (album)
            acc.push(...(0, utils_1.convertToAndroidAlbumFromDB)([album], tracks));
        return acc;
        // const album = ALBUM_MAP[each.albumId] || null;
        // if (album) albums.push(...convertToAndroidAlbum([album]));
        // return albums;
    }, []);
};
const getQuickPicks = async () => {
    // const final: AndroidTrack[] = [];
    // const uniqNums: number[] = [];
    // for (let i=1; i<=12; i++) {
    //     let gotUniqueRandomNum = false, rand: number = 0;
    //     while (!gotUniqueRandomNum) {
    //         rand = Math.floor(Math.random() * ALBUM_LIST_TRACKS.length);
    //         if (!uniqNums.includes(rand)) {
    //             uniqNums.push(rand);
    //             gotUniqueRandomNum = true;
    //         }
    //     }
    //     final.push(ALBUM_LIST_TRACKS[rand]);
    // }
    // return final;
    const { Albums, Tracks } = mongodb_connection_1.MongoStudioHandler.getCollectionSet();
    const tracks = await Tracks.aggregate([
        { $sample: { size: 12 } }
    ])
        .toArray();
    const albums = await Albums.find({
        _albumId: { $in: lodash_1.default.map(tracks, t => new mongodb_1.ObjectId(t._albumId)) }
    })
        .toArray();
    return (0, utils_1.convertToAndroidTrackFromDB)(albums, tracks);
};
const getSongs = (name) => {
    const lower = name.toLowerCase();
    const tracks = archiveGateway_1.ALBUM_LIST_TRACKS.reduce((acc, track) => {
        const in_title = track.Title.toLowerCase().includes(lower);
        const in_artists = track.Artist.toLowerCase().includes(lower);
        const in_artists_2 = (track.Artist.replace(/$/g, "s")).toLowerCase().includes(lower);
        const in_albumname = track.Album.toLowerCase().includes(lower);
        if (in_title || in_albumname || in_artists || in_artists_2) {
            acc.push(track);
        }
        return acc;
    }, []);
    if (tracks.length <= 50)
        return tracks;
    const final = [];
    const uniqNums = [];
    for (let i = 1; i <= 50; i++) {
        let gotUniqueRandomNum = false, rand = 0;
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
const getAlbums = (name) => {
    const lower = name.toLowerCase();
    const ANDROID_ALBUMS = (0, utils_1.convertToAndroidAlbum)(archiveGateway_1.default);
    const albums = ANDROID_ALBUMS.reduce((acc, album) => {
        const in_tracktitles = album.Tracks.reduce((acc, track) => {
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
    if (albums.length <= 50)
        return albums;
    const final = [];
    const uniqNums = [];
    for (let i = 1; i <= 50; i++) {
        let gotUniqueRandomNum = false, rand = 0;
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
const notifyAdmin = async () => {
    try {
        const options = {
            to: "toriumcar@gmail.com",
            subject: "App Download",
            html: "Someone tried to download the apk!"
        };
        await (0, nodemailer_service_1.sendEmail)(options);
    }
    catch (e) {
        console.log("error sending email to admin on aok download", e);
    }
};
const checkServer = (req) => {
    return { status: "active", server: utils_1.server };
};
exports.checkServer = checkServer;
const activeSessions = async (request) => {
    const { Users } = mongodb_connection_1.MongoStudioHandler.getCollectionSet();
    const { id = null } = request.ACCOUNT;
    const { sessionId = null } = request.result;
    const user = await Users.findOne({
        _id: id ? new mongodb_1.ObjectId(id) : undefined
    });
    if (!user)
        return [];
    const { activeSessions = [] } = user;
    return activeSessions.map(each => {
        const obj = Object.assign({}, each);
        obj.thisDevice = each.sessionId === sessionId;
        return obj;
    });
};
exports.activeSessions = activeSessions;
const getLibrary = async (request) => {
    const { page = "1" } = request.query;
    const start = parseInt(page) - 1;
    const no = 7 * 7;
    const { Albums, Tracks } = mongodb_connection_1.MongoStudioHandler.getCollectionSet();
    const albums = await Albums.find().sort({ _id: 1 }).toArray();
    const tracks = await Tracks.find().sort({ _id: 1 }).toArray();
    const allAlbums = (0, utils_1.convertToAndroidAlbumFromDB)(albums, tracks);
    const sublibrary = allAlbums.slice(start * no, (start * no) + no);
    const random = (0, utils_1.randomize)(sublibrary);
    return {
        more: (() => {
            if ((start * no) + no === allAlbums.length)
                return false;
            if (sublibrary.length < no)
                return false;
            return true;
        })(),
        data: random
    };
};
exports.getLibrary = getLibrary;
const getAlbum = async (request) => {
    var _a;
    const { albumId = "" } = request.query;
    const { Albums, Tracks } = mongodb_connection_1.MongoStudioHandler.getCollectionSet();
    const album = await Albums.findOne({
        _albumId: new mongodb_1.ObjectId(albumId)
    });
    const tracks = await Tracks.find({
        _albumId: new mongodb_1.ObjectId(albumId)
    })
        .toArray();
    return ((_a = ((0, utils_1.convertToAndroidAlbumFromDB)([album], tracks))) === null || _a === void 0 ? void 0 : _a[0]) || null;
    // const album = ALBUMLIST.find(each => each._albumId === albumId);
    // if (!album) return null;
    // return {
    //     _albumId: album._albumId,
    //     Album: album.Album,
    //     AlbumArtist: album.AlbumArtist,
    //     Type: album.Type,
    //     Year: album.Year,
    //     Color: album.Color,
    //     Thumbnail: album.Thumbnail,
    //     releaseDate: album.releaseDate,
    //     Tracks: (() => {
    //         if (album.Type === "Album") {
    //             return (album as Album).Tracks.map(track => {
    //                 track.lyrics = track.lyrics || false;
    //                 track.sync = track.sync || false;
    //                 return track;
    //             });
    //         }
    //         if (album.Type === "Single") {
    //             const single = (album as Single);
    //             return [{
    //                 _trackId: single._trackId,
    //                 Title: single.Album,
    //                 Artist: single.Artist,
    //                 Duration: single.Duration,
    //                 url: single.url,
    //                 lyrics: single.lyrics || false,
    //                 sync: single.sync || false
    //             }];
    //         }
    //         return [];
    //     })()
    // };
};
exports.getAlbum = getAlbum;
const homeAlbums = async (request, _) => {
    const { id: userId } = request.ACCOUNT;
    const mostPlayed = await getMostPlayed(userId);
    const homeList = {};
    homeList["New Releases"] = (0, utils_1.convertToAndroidAlbum)(archiveGateway_1.NewReleases);
    homeList["Recently Added"] = (0, utils_1.convertToAndroidAlbum)(archiveGateway_1.RecentlyAdded);
    return { albums: homeList, mostPlayed, quickPicks: await getQuickPicks() };
};
exports.homeAlbums = homeAlbums;
const search = async (request, _) => {
    const { name } = request.query;
    if (!name)
        return { tracks: [], albums: [], artists: [] };
    const tracks = getSongs(name);
    const albums = getAlbums(name);
    return { tracks, albums, artists: [] };
};
exports.search = search;
const startRadio = async (request, _) => {
    const { exclude: toBeExcludedTrackId = "" } = request.query;
    const randomNumberCounter = {};
    const finalArr = [];
    let rand, done;
    const songlist = archiveGateway_1.ALBUM_LIST_TRACKS.filter(song => {
        return String(song._trackId) !== String(toBeExcludedTrackId);
    });
    const len = songlist.length;
    for (let i = 0; i < 75; i++) {
        done = false;
        let limit = 3;
        while (!done) {
            if (limit === 0)
                break;
            else
                limit--;
            rand = Math.floor(Math.random() * len);
            if (!randomNumberCounter[rand]) {
                finalArr.push(songlist[rand]);
                randomNumberCounter[rand] = true;
                done = true;
            }
        }
    }
    ;
    return finalArr;
};
exports.startRadio = startRadio;
const getMostPlayedRadio = async (request, _) => {
    const { Users } = mongodb_connection_1.MongoStudioHandler.getCollectionSet();
    const { exclude: toBeExcludedAlbumId = "" } = request.query;
    const { id: userId } = request.ACCOUNT;
    const user = await Users.findOne({
        _id: new mongodb_1.ObjectId(userId)
    });
    if (!user)
        return [];
    const { recentlyPlayed: recents } = user;
    const recentsAlbumIdsMap = recents.reduce((acc, each) => {
        acc[String(each.albumId)] = true;
        return acc;
    }, {});
    const tracks = archiveGateway_1.ALBUM_LIST_TRACKS.filter(each => {
        const cond1 = String(each._albumId) !== String(toBeExcludedAlbumId);
        const cond2 = recentsAlbumIdsMap[String(each._albumId)] || false;
        return cond1 && cond2;
    });
    const len = tracks.length;
    const final = [];
    const randomNumberCounter = {};
    let done;
    for (let i = 0; i < 50; i++) {
        done = false;
        let limit = 3;
        while (!done) {
            if (limit === 0)
                break;
            else
                limit--;
            const rand = Math.floor(Math.random() * len);
            if (!randomNumberCounter[rand]) {
                final.push(tracks[rand]);
                randomNumberCounter[rand] = true;
                done = true;
            }
        }
    }
    ;
    return final;
};
exports.getMostPlayedRadio = getMostPlayedRadio;
const checkForUpdates = async (request, _) => {
    const { Users } = mongodb_connection_1.MongoStudioHandler.getCollectionSet();
    const { versionCode = null, versionName = null, buildType = null } = request.query;
    const { id: userId } = request.ACCOUNT;
    if (versionCode === null || versionName === null || buildType === null) {
        throw new Error("incomplete version details!");
    }
    const user = await Users.findOne({
        _id: new mongodb_1.ObjectId(userId)
    });
    if (user === null) {
        throw new Error("user not found!");
    }
    user.installedVersion = {
        versionCode: Number(versionCode),
        versionName,
        buildType
    };
    await Users.updateOne({ _id: new mongodb_1.ObjectId(user._id) }, { $set: user });
    const updateAvailable = (() => {
        const latest_versionCode = buildType === utils_1.BUILD_TYPE.DEBUG ?
            latestUpdate_1.LATEST_APP_UPDATE.DEBUG.versionCode : latestUpdate_1.LATEST_APP_UPDATE.RELEASE.versionCode;
        const latest_versionName = buildType === utils_1.BUILD_TYPE.DEBUG ?
            latestUpdate_1.LATEST_APP_UPDATE.DEBUG.versionName : latestUpdate_1.LATEST_APP_UPDATE.RELEASE.versionName;
        const different_versionCode = Number(versionCode) < latest_versionCode;
        const different_versionName = (() => {
            const versionName_num = (() => {
                try {
                    return Number(versionName.split(".").join(""));
                }
                catch (e) {
                    return null;
                }
            })();
            const latest_versionName_num = (() => {
                try {
                    return Number(latest_versionName.split(".").join(""));
                }
                catch (e) {
                    return null;
                }
            })();
            if (versionName_num === null || latest_versionName_num === null)
                return false;
            return versionName_num < latest_versionName_num;
        })();
        return different_versionCode || different_versionName;
    })();
    return { updateAvailable };
};
exports.checkForUpdates = checkForUpdates;
const downloadLatestUpdate = async (request, response) => {
    const { buildType = utils_1.BUILD_TYPE.RELEASE } = request.query;
    const filename = buildType === utils_1.BUILD_TYPE.DEBUG ?
        latestUpdate_1.LATEST_APP_UPDATE.DEBUG.filename :
        latestUpdate_1.LATEST_APP_UPDATE.RELEASE.filename;
    const filePath = buildType === utils_1.BUILD_TYPE.DEBUG ?
        latestUpdate_1.LATEST_APP_UPDATE.DEBUG.filePath :
        latestUpdate_1.LATEST_APP_UPDATE.RELEASE.filePath;
    notifyAdmin();
    response.setHeader("Content-Disposition", "attachment;filename=" + filename);
    response.sendFile(filePath);
};
exports.downloadLatestUpdate = downloadLatestUpdate;
//# sourceMappingURL=api-functions.js.map