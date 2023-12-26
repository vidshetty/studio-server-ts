"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadLatestUpdate = exports.checkForUpdates = exports.getMostPlayedRadio = exports.startRadio = exports.search = exports.homeAlbums = exports.getAlbum = exports.getLibrary = exports.activeSessions = exports.checkServer = void 0;
const utils_1 = require("../helpers/utils");
const Users_1 = require("../models/Users");
const archiveGateway_1 = __importStar(require("../data/archiveGateway"));
const latestUpdate_1 = require("../data/latestUpdate");
const getMostPlayed = async (userId) => {
    const user = await Users_1.Users.findOne({ _id: userId }).lean();
    const { recentlyPlayed: recents } = user;
    const sorted_recents = recents.sort((a, b) => {
        if (a.last < b.last)
            return 1;
        return -1;
    });
    const top_recents = sorted_recents.slice(0, 6);
    if (top_recents.length < 6)
        return [];
    return top_recents.reduce((albums, each) => {
        const album = archiveGateway_1.ALBUM_MAP[each.albumId] || null;
        if (album)
            albums.push(...(0, utils_1.convertToAndroidAlbum)([album]));
        return albums;
    }, []);
};
const getQuickPicks = () => {
    const final = [];
    const uniqNums = [];
    for (let i = 1; i <= 12; i++) {
        let gotUniqueRandomNum = false, rand = 0;
        while (!gotUniqueRandomNum) {
            rand = Math.floor(Math.random() * archiveGateway_1.ALBUM_LIST_TRACKS.length);
            if (!uniqNums.includes(rand)) {
                uniqNums.push(rand);
                gotUniqueRandomNum = true;
            }
        }
        final.push(archiveGateway_1.ALBUM_LIST_TRACKS[rand]);
    }
    return final;
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
const checkServer = (req) => {
    return { status: "active", server: utils_1.server };
};
exports.checkServer = checkServer;
const activeSessions = async (request) => {
    const { id = null } = request.ACCOUNT;
    const { sessionId = null } = request.result;
    const user = await Users_1.Users.findOne({ _id: id });
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
    const allAlbums = (0, utils_1.convertToAndroidAlbum)(archiveGateway_1.default);
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
    const { albumId = "" } = request.query;
    const album = archiveGateway_1.default.find(each => each._albumId === albumId);
    if (!album)
        return null;
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
                return album.Tracks.map(track => {
                    track.lyrics = track.lyrics || false;
                    track.sync = track.sync || false;
                    return track;
                });
            }
            if (album.Type === "Single") {
                const single = album;
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
exports.getAlbum = getAlbum;
const homeAlbums = async (request, _) => {
    const { id: userId } = request.ACCOUNT;
    const mostPlayed = await getMostPlayed(userId);
    const homeList = {};
    homeList["New Releases"] = (0, utils_1.convertToAndroidAlbum)(archiveGateway_1.NewReleases);
    homeList["Recently Added"] = (0, utils_1.convertToAndroidAlbum)(archiveGateway_1.RecentlyAdded);
    return { albums: homeList, mostPlayed, quickPicks: getQuickPicks() };
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
    const { exclude: toBeExcludedAlbumId = "" } = request.query;
    const { id: userId } = request.ACCOUNT;
    const user = await Users_1.Users.findOne({ _id: userId });
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
    const { versionCode = null, versionName = null, buildType = null } = request.query;
    const { id: userId } = request.ACCOUNT;
    if (versionCode === null || versionName === null || buildType === null) {
        throw new Error("incomplete version details!");
    }
    const user = await Users_1.Users.findOne({ _id: userId });
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
    response.setHeader("Content-Disposition", "attachment;filename=" + filename);
    response.sendFile(filePath);
};
exports.downloadLatestUpdate = downloadLatestUpdate;
//# sourceMappingURL=api-functions.js.map