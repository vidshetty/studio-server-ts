"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbum = exports.getLibrary = exports.activeSessions = exports.checkServer = void 0;
const utils_1 = require("../helpers/utils");
const Users_1 = require("../models/Users");
const archiveGateway_1 = __importDefault(require("../data/archiveGateway"));
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
    const allAlbums = archiveGateway_1.default.reduce((acc, each) => {
        const album = each;
        const single = each;
        acc.push({
            _albumId: each._albumId,
            Album: each.Album,
            AlbumArtist: each.AlbumArtist,
            Type: each.Type,
            Year: each.Year,
            Color: each.Color,
            Thumbnail: each.Thumbnail,
            releaseDate: each.releaseDate,
            Tracks: (() => {
                if (each.Type === "Album") {
                    return album.Tracks.map(track => {
                        track.lyrics = track.lyrics || false;
                        track.sync = track.sync || false;
                        return track;
                    });
                }
                if (each.Type === "Single") {
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
        });
        return acc;
    }, []);
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
//# sourceMappingURL=api-functions.js.map