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
exports.homeAlbums = exports.getAlbum = exports.getLibrary = exports.activeSessions = exports.checkServer = void 0;
const utils_1 = require("../helpers/utils");
const Users_1 = require("../models/Users");
const archiveGateway_1 = __importStar(require("../data/archiveGateway"));
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
    const all_tracks = archiveGateway_1.default.reduce((acc, each) => {
        acc.push(...(0, utils_1.convertToAndroidTrack)([each]));
        return acc;
    }, []);
    const final = [];
    const uniqNums = [];
    for (let i = 1; i <= 12; i++) {
        let gotUniqueRandomNum = false, rand = 0;
        while (!gotUniqueRandomNum) {
            rand = Math.floor(Math.random() * archiveGateway_1.default.length);
            if (!uniqNums.includes(rand)) {
                uniqNums.push(rand);
                gotUniqueRandomNum = true;
            }
        }
        final.push(all_tracks[rand]);
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
//# sourceMappingURL=api-functions.js.map