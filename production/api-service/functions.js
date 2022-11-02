"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = exports.getProfile = exports.activateCheck = exports.recordTime = exports.startRadio = exports.getLyrics = exports.addToRecentlyPlayed = exports.search = exports.getAlbumDetails = exports.getTrackDetails = exports.getLibrary = exports.homeAlbums = exports.getTrack = exports.getAlbum = void 0;
const Users_1 = require("../models/Users");
const utils_1 = require("../helpers/utils");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const path_1 = __importDefault(require("path"));
const archiveGateway_1 = __importDefault(require("../data/archiveGateway"));
const ALBUM_MAP = archiveGateway_1.default.reduce((acc, each) => {
    acc[each._albumId] = each;
    return acc;
}, {});
const compare = (a, b) => {
    if (a.releaseDate > b.releaseDate)
        return -1;
    return 1;
};
const [NewReleases, RecentlyAdded] = (() => {
    const newReleases = [...archiveGateway_1.default].sort(compare).slice(0, 6);
    const recentlyAdded = [];
    const len = archiveGateway_1.default.length;
    for (let i = len - 1; i >= 0 && recentlyAdded.length < 6; i--) {
        const index = newReleases.findIndex(each => each._albumId === archiveGateway_1.default[i]._albumId);
        if (index === -1)
            recentlyAdded.push(archiveGateway_1.default[i]);
    }
    return [newReleases, recentlyAdded];
})();
const compareRecents = (a, b) => {
    if (a.last < b.last)
        return 1;
    return -1;
};
const __distribute = (list, type) => {
    let obj = {}, times, songnum = 2, albumnum = 5, quicknum = 3, recentsnum = 3;
    if (type === "song") {
        let another = list.length > 8 ? list.slice(0, 8) : list;
        times = Math.ceil(another.length / songnum);
        for (let i = 0; i < times; i++) {
            obj[i] = another.slice(i * songnum, (i * songnum) + songnum);
        }
        return obj;
    }
    if (type === "album") {
        let another = list.length > 5 ? list.slice(0, 5) : list;
        times = Math.ceil(another.length / albumnum);
        for (let i = 0; i < times; i++) {
            obj[i] = another.slice(i * albumnum, (i * albumnum) + albumnum);
        }
        return obj;
    }
    if (type === "quick-pick") {
        times = Math.ceil(list.length / quicknum);
        for (let i = 0; i < times; i++) {
            obj[i] = list.slice(i * quicknum, (i * quicknum) + quicknum);
        }
        return obj;
    }
    if (type === "recents") {
        times = Math.ceil(list.length / recentsnum);
        for (let i = 0; i < times; i++) {
            obj[i] = list.slice(i * recentsnum, (i * recentsnum) + recentsnum);
        }
        return obj;
    }
    return { 1: list };
};
const inspectRecentlyPlayed = async (userId) => {
    if (!userId)
        return;
    const user = await Users_1.Users.findOne({ _id: userId });
    if (!user)
        return;
    const { recentlyPlayed } = user;
    let { recentsLastModified } = user;
    if (!recentsLastModified) {
        recentsLastModified = (0, moment_timezone_1.default)().subtract(1, "d").tz(utils_1.timezone).startOf("d").toDate();
    }
    let shouldModify = false;
    const time = moment_timezone_1.default.duration((0, moment_timezone_1.default)().tz(utils_1.timezone).diff((0, moment_timezone_1.default)(recentsLastModified)));
    const timeInDays = Math.floor(time.asDays());
    if (timeInDays > 0)
        shouldModify = true;
    const modifiedRecents = recentlyPlayed.reduce((acc, each) => {
        let { frequency = 0, last = "" } = each;
        const diff = moment_timezone_1.default.duration((0, moment_timezone_1.default)().tz(utils_1.timezone).diff((0, moment_timezone_1.default)(last)));
        const days = diff.asDays();
        if (days >= 7)
            return acc;
        if (frequency === 0)
            return acc;
        if (shouldModify && frequency - timeInDays > 0) {
            each.frequency = frequency - timeInDays;
        }
        if (each.frequency > 0)
            acc.push(each);
        return acc;
    }, []);
    await Object.assign(user, {
        recentlyPlayed: modifiedRecents,
        recentsLastModified: shouldModify ? (0, moment_timezone_1.default)().tz(utils_1.timezone).startOf("d").toDate() :
            recentsLastModified
    }).save();
};
const getMostPlayed = async (userId) => {
    const user = await Users_1.Users.findOne({ _id: userId }).lean();
    let { recentlyPlayed: recents } = user;
    recents = recents.sort(compareRecents);
    recents = recents.slice(0, 6);
    if (recents.length < 6)
        return [];
    return recents.reduce((albums, each) => {
        const song = ALBUM_MAP[each.albumId];
        if (song)
            albums.push(song);
        return albums;
    }, []);
};
const getQuickPicks = () => {
    const allSongs = archiveGateway_1.default.reduce((list, album) => {
        if (album.Type === "Single")
            list.push(album);
        if (album.Type === "Album") {
            const dummy_album = album;
            dummy_album.Tracks.forEach(track => {
                const song = Object.assign(Object.assign({}, dummy_album), track);
                delete song.Tracks;
                list.push(song);
            });
        }
        return list;
    }, []);
    const final = [];
    const uniqNums = [];
    for (let i = 1; i <= 12; i++) {
        let gotUniqueRandomNum = false, rand = 0;
        while (!gotUniqueRandomNum) {
            rand = Math.floor(Math.random() * allSongs.length);
            if (!uniqNums.includes(rand)) {
                uniqNums.push(rand);
                gotUniqueRandomNum = true;
            }
        }
        final.push(allSongs[rand]);
    }
    return final;
};
const randomize = (arr) => {
    let i, len = arr.length, rand;
    for (i = len - 1; i >= 0; i--) {
        rand = Math.floor(Math.random() * len);
        [arr[i], arr[rand]] = [arr[rand], arr[i]];
    }
    return arr;
};
const getSongs = (name) => {
    const lower = name.toLowerCase();
    return archiveGateway_1.default.reduce((acc, song) => {
        const album = song;
        const single = song;
        if (song.Type === "Album") {
            for (let track of album.Tracks) {
                const inTitle = track.Title.toLowerCase().includes(lower);
                if (inTitle) {
                    const obj = Object.assign(Object.assign({}, track), album);
                    obj.Tracks = [];
                    acc.push(obj);
                    continue;
                }
                const inArtist = track.Artist.toLowerCase().includes(lower);
                if (inArtist) {
                    const obj = Object.assign(Object.assign({}, track), album);
                    obj.Tracks = [];
                    acc.push(obj);
                }
            }
            return acc;
        }
        if (song.Type === "Single") {
            const inAlbum = single.Album.toLowerCase().includes(lower);
            if (inAlbum) {
                acc.push(single);
                return acc;
            }
            const inArtist = single.Artist.toLowerCase().includes(lower);
            if (inArtist) {
                acc.push(single);
            }
            return acc;
        }
        return acc;
    }, []);
};
const getAlbums = (name) => {
    const lower = name.toLowerCase();
    return archiveGateway_1.default.reduce((acc, song) => {
        const album = song;
        const single = song;
        if (song.Type === "Album") {
            let isInAlbum = false, isInTracks = false, isInAlbumArtist = false;
            for (let track of album.Tracks) {
                const inTitle = track.Title.toLowerCase().includes(lower);
                if (inTitle) {
                    isInTracks = true;
                    break;
                }
            }
            if (song.Album.toLowerCase().includes(lower))
                isInAlbum = true;
            if (song.AlbumArtist.toLowerCase().includes(lower))
                isInAlbumArtist = true;
            if (isInAlbum || isInTracks || isInAlbumArtist)
                acc.push(album);
            return acc;
        }
        if (song.Type === "Single") {
            const inAlbum = single.Album.toLowerCase().includes(lower);
            const inAlbumArtist = single.AlbumArtist.toLowerCase().includes(lower);
            if (inAlbum || inAlbumArtist)
                acc.push(single);
            return acc;
        }
        return acc;
    }, []);
};
const __qr = async (toBeExcluded, userId) => {
    const user = await Users_1.Users.findOne({ _id: userId });
    const { recentlyPlayed: recents = [] } = user;
    let filterRecents = true, recentsMap;
    const recentlyPlayed = recents.sort(compareRecents).slice(0, 6);
    if (recentlyPlayed.length < 6)
        filterRecents = false;
    if (filterRecents) {
        recentsMap = recentlyPlayed.reduce((acc, item) => {
            acc[item.albumId] = true;
            return acc;
        }, {});
    }
    const randomNumberCounter = {};
    const finalArr = [];
    let rand, done;
    const songlist = archiveGateway_1.default.reduce((list, song) => {
        const album = song;
        const single = song;
        if (song._albumId === toBeExcluded)
            return list;
        if (filterRecents && recentsMap[song._albumId])
            return list;
        if (single.Type === "Single")
            list.push(single);
        if (album.Type === "Album") {
            album.Tracks.forEach(track => {
                if (track._trackId === toBeExcluded)
                    return;
                const obj = Object.assign(Object.assign({}, album), track);
                obj.Tracks = [];
                list.push(obj);
            });
        }
        return list;
    }, []);
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
const __rp = async (toBeExcluded, userId) => {
    const user = await Users_1.Users.findOne({ _id: userId });
    const { recentlyPlayed: recents } = user;
    const recentsAlbumIds = recents.map(each => each.albumId);
    const albums = archiveGateway_1.default.reduce((list, song) => {
        const album = song;
        const single = song;
        if (album._albumId === toBeExcluded)
            return list;
        if (!recentsAlbumIds.includes(album._albumId))
            return list;
        if (single.Type === "Single")
            list.push(single);
        if (album.Type === "Album") {
            album.Tracks.forEach(t => {
                if (t._trackId === toBeExcluded)
                    return;
                const obj = Object.assign(Object.assign({}, album), t);
                obj.Tracks = [];
                list.push(obj);
            });
        }
        return list;
    }, []);
    const len = albums.length;
    const final = [];
    const randomNumberCounter = {};
    let done;
    for (let i = 0; i < 40; i++) {
        done = false;
        let limit = 3;
        while (!done) {
            if (limit === 0)
                break;
            else
                limit--;
            const rand = Math.floor(Math.random() * len);
            if (!randomNumberCounter[rand]) {
                final.push(albums[rand]);
                randomNumberCounter[rand] = true;
                done = true;
            }
        }
    }
    ;
    return final;
};
const getAlbum = (request) => {
    const { albumId } = request.query;
    if (!albumId)
        return null;
    const album = archiveGateway_1.default.find(each => each._albumId === albumId);
    if (!album)
        return null;
    return album;
};
exports.getAlbum = getAlbum;
const getTrack = (request) => {
    const { albumId, trackId } = request.query;
    if (!albumId || !trackId)
        return null;
    const album = archiveGateway_1.default.find(each => each._albumId === albumId);
    if (!album)
        return null;
    let track = null;
    if (album.Type === "Single") {
        track = Object.assign({}, album);
    }
    else if (album.Type === "Album") {
        album.Tracks.forEach(t => {
            if (String(t._trackId) !== trackId)
                return;
            track = Object.assign(Object.assign({}, album), t);
            track.Tracks = [];
        });
    }
    return track;
};
exports.getTrack = getTrack;
const homeAlbums = async (request, _) => {
    const { id: userId } = request.ACCOUNT;
    const mostPlayed = await getMostPlayed(userId);
    const homeList = {};
    homeList["New Releases"] = NewReleases;
    homeList["Recently Added"] = RecentlyAdded;
    return { albums: homeList, mostPlayed, quickPicks: getQuickPicks() };
};
exports.homeAlbums = homeAlbums;
const getLibrary = async (request, response) => {
    const { page } = request.query;
    const start = parseInt(page || "1") - 1;
    const no = 7 * 7;
    const arr = archiveGateway_1.default.map((each, i) => {
        return Object.assign(Object.assign({}, each), { keyId: i });
    });
    const sublibrary = arr.slice(start * no, (start * no) + no);
    const random = randomize(sublibrary);
    let result;
    if ((start * no) + no === arr.length || sublibrary.length < no) {
        result = { more: false, data: random };
    }
    else {
        result = { more: true, data: random };
    }
    return result;
};
exports.getLibrary = getLibrary;
const getTrackDetails = async (request, _) => {
    return { track: (0, exports.getTrack)(request) };
};
exports.getTrackDetails = getTrackDetails;
const getAlbumDetails = async (request, _) => {
    return { album: (0, exports.getAlbum)(request) };
};
exports.getAlbumDetails = getAlbumDetails;
const search = async (request, _) => {
    const { name } = request.query;
    if (!name)
        return { songs: [], albums: [], artists: [] };
    const songs = getSongs(name);
    const albums = getAlbums(name);
    return { songs, albums, artists: [] };
};
exports.search = search;
const addToRecentlyPlayed = async (request, _) => {
    const { id: userId } = request.ACCOUNT;
    const { albumId } = request.body;
    const user = await Users_1.Users.findOne({ _id: userId });
    const { recentlyPlayed: recents } = user;
    const index = recents.findIndex(each => each.albumId === albumId);
    if (index === -1) {
        recents.push({ albumId, frequency: 1, last: (0, moment_timezone_1.default)().tz(utils_1.timezone).toDate() });
    }
    else {
        recents[index].frequency++;
        recents[index].last = (0, moment_timezone_1.default)().tz(utils_1.timezone).toDate();
    }
    await Object.assign(user, { recentlyPlayed: recents }).save();
    return;
};
exports.addToRecentlyPlayed = addToRecentlyPlayed;
const getLyrics = async (request, _) => {
    let { name } = request.query;
    name = (0, utils_1.__replace)(name, ['"', ':'], "");
    const fileName = path_1.default.join(process.cwd(), "data", "lyrics", "json", `${name}.json`);
    try {
        const data = JSON.parse(await (0, utils_1.readFileAsync)(fileName));
        const list = data.map((each, i) => {
            each.key = i;
            return each;
        });
        return list;
    }
    catch (e) {
        return [];
    }
    // try {
    //     let data: string = fs.readFileSync(fileName, { encoding: "utf-8" });
    //     data = data.replace(/\r\n/g,"");
    //     let arr: string[] = data.split(";");
    //     arr.splice(data.length-1,1);
    //     const list = arr.map<Lyrics>((each: string, i: number) => {
    //         const obj: Lyrics = {
    //             from: 0, to: 0, text: "", key: 0
    //         };
    //         const [numbers, lyric] = each.split(":");
    //         obj.from = parseFloat(numbers.split("-")[0]);
    //         obj.to = parseFloat(numbers.split("-")[1]);
    //         obj.text = lyric;
    //         obj.key = i;
    //         return obj;
    //     });
    //     return list;
    // }
    // catch(e) {
    //     return [];
    // }
};
exports.getLyrics = getLyrics;
const startRadio = async (request, _) => {
    const { exclude: toBeExcluded = "", type } = request.query;
    const { id: userId } = request.ACCOUNT;
    let finalArr = [];
    if (type === "qr") {
        finalArr = await __qr(toBeExcluded, userId);
    }
    else if (type === "rp") {
        finalArr = await __rp(toBeExcluded, userId);
    }
    return finalArr;
};
exports.startRadio = startRadio;
const recordTime = async (request, _) => {
    const { id: userId } = request.ACCOUNT;
    const user = await Users_1.Users.findOne({ _id: userId });
    Object.assign(user, {
        lastUsed: (0, moment_timezone_1.default)().tz(utils_1.timezone).format("DD MMM YYYY, h:mm:ss a")
    });
    await user.save();
    return;
};
exports.recordTime = recordTime;
const activateCheck = async (request, _) => {
    const { id: userId } = request.ACCOUNT;
    inspectRecentlyPlayed(userId);
    return { status: "active", server: utils_1.server };
};
exports.activateCheck = activateCheck;
const getProfile = async (request, _) => {
    const { id: userId } = request.ACCOUNT;
    const { from = "" } = request.query;
    const songlist = archiveGateway_1.default;
    const user = await Users_1.Users.findOne({ _id: userId });
    const { googleAccount, accountAccess } = user;
    if (from !== "auth") {
        return {
            name: user.username,
            email: googleAccount.email,
            picture: googleAccount.picture,
            limit: (0, moment_timezone_1.default)(accountAccess.timeLimit).tz(utils_1.timezone).format("DD MMMM YYYY hh:mm A")
        };
    }
    const { recentlyPlayed } = user;
    const recents = recentlyPlayed.sort(compareRecents).slice(0, 6);
    const list = recents.map(each => {
        const index = songlist.findIndex(s => s._albumId === each.albumId);
        return songlist[index];
    });
    const dist = __distribute(list, "recents");
    const res = JSON.parse(JSON.stringify(user));
    res.recentlyPlayed = dist;
    return { found: true, user: res };
};
exports.getProfile = getProfile;
const signOut = async (request, response) => {
    const { ACCOUNT } = request;
    const user = await Users_1.Users.findOne({ _id: ACCOUNT.id });
    if (user) {
        const { accountAccess } = user;
        const duration = Math.floor((0, moment_timezone_1.default)(accountAccess.timeLimit).diff((0, moment_timezone_1.default)().tz(utils_1.timezone), "s"));
        Object.assign(user, {
            loggedIn: "logged out",
            lastUsed: (0, moment_timezone_1.default)().tz(utils_1.timezone).format("DD MMM YYYY, h:mm:ss a"),
            accountAccess: Object.assign(Object.assign({}, accountAccess), { duration, seen: false, timeLimit: null })
        });
        await user.save();
        response.clearCookie("ACCOUNT", utils_1.standardCookieConfig);
        response.clearCookie("ACCOUNT_REFRESH", utils_1.standardCookieConfig);
        response.clearCookie("REDIRECT_URI", utils_1.redirectUriCookieConfig);
        return { success: true };
    }
    return { success: false };
};
exports.signOut = signOut;
//# sourceMappingURL=functions.js.map