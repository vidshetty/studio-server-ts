import { Request, Response } from "express";
import _ from "lodash";
import { ObjectId } from "mongodb";
import { NodemailerOptions } from "../helpers/interfaces";
import { sendEmail } from "../nodemailer-service";
import { Users } from "../models/Users";
import {
    AlbumlistMap,
    AlbumList,
    Album,
    Single,
    UserInterface,
    RecentlyPlayed,
    ModifiedAlbumList,
    AlbumWithTrack,
    Lyrics,
    SpotifyLyrics,
    RequestQuery
} from "../helpers/interfaces";
import {
    timezone,
    server,
    standardCookieConfig,
    redirectUriCookieConfig,
    readFileAsync,
    randomize,
    __replace
} from "../helpers/utils";
import moment from "moment-timezone";
import path from "path";
import ALBUMLIST from "../data/archiveGateway";
import { LATEST_APP_UPDATE } from "../data/latestUpdate";
import { MongoStudioHandler } from "../helpers/mongodb-connection";
import { TracksSchema } from "../helpers/schema";


interface RecentsMap {
    [key: string]: boolean;
}



const ALBUM_MAP: AlbumlistMap = ALBUMLIST.reduce<AlbumlistMap>((acc,each) => {
    acc[each._albumId] = each;
    return acc;
}, {});

const compare = (a: AlbumList, b: AlbumList): number => {
    if (a.releaseDate > b.releaseDate) return -1;
    return 1;
};

const [NewReleases, RecentlyAdded] = (() => {

    const newReleases = [...ALBUMLIST].sort(compare).slice(0,6);

    const recentlyAdded = [];
    const len = ALBUMLIST.length;

    for (let i=len-1; i>=0 && recentlyAdded.length < 6; i--) {
        const index = newReleases.findIndex(each => each._albumId === ALBUMLIST[i]._albumId);
        if (index === -1) recentlyAdded.push(ALBUMLIST[i]);
    }

    return [newReleases, recentlyAdded];

})();

const compareRecents = (a: RecentlyPlayed, b: RecentlyPlayed) => {
    if (a.last < b.last) return 1;
    return -1;
};

const __distribute = (list: AlbumList[], type: string) => {

    let obj: { [key: number]: AlbumList[] } = {},
    times: number, songnum: number = 2, albumnum: number = 5,
    quicknum: number = 3, recentsnum: number = 3;

    if (type === "song") {
        let another = list.length > 8 ? list.slice(0,8) : list;
        times = Math.ceil(another.length / songnum);
        for (let i=0; i<times; i++) {
            obj[i] = another.slice(i*songnum,(i*songnum)+songnum);
        }
        return obj;
    }

    if (type === "album") {
        let another = list.length > 5 ? list.slice(0,5) : list;
        times = Math.ceil(another.length / albumnum);
        for (let i=0; i<times; i++) {
            obj[i] = another.slice(i*albumnum,(i*albumnum)+albumnum);
        }
        return obj;
    }

    if (type === "quick-pick") {
        times = Math.ceil(list.length / quicknum);
        for (let i=0; i<times; i++) {
            obj[i] = list.slice(i*quicknum,(i*quicknum)+quicknum);
        }
        return obj;
    }

    if (type === "recents") {
        times = Math.ceil(list.length / recentsnum);
        for (let i=0; i<times; i++) {
            obj[i] = list.slice(i*recentsnum,(i*recentsnum)+recentsnum);
        }
        return obj;
    }

    return { 1: list };

};

const inspectRecentlyPlayed = async (userId: string) => {

    if (!userId) return;
    const user: UserInterface | null = await Users.findOne({ _id: userId });
    if (!user) return;

    const { recentlyPlayed } = user;
    let { recentsLastModified } = user;

    if (!recentsLastModified) {
        recentsLastModified = moment().subtract(1,"d").tz(timezone).startOf("d").toDate();
    }

    let shouldModify = false;
    const time = moment.duration(moment().tz(timezone).diff(moment(recentsLastModified)));
    const timeInDays = Math.floor(time.asDays());
    if (timeInDays > 0) shouldModify = true;

    const modifiedRecents = recentlyPlayed.reduce<RecentlyPlayed[]>((acc,each) => {

        let { frequency = 0, last = "" } = each;

        const diff = moment.duration(moment().tz(timezone).diff(moment(last)));
        const days = diff.asDays();
        if (days >= 7) return acc;

        if (frequency === 0) return acc;

        if (shouldModify && frequency - timeInDays > 0) {
            each.frequency = frequency - timeInDays;
        }

        if (each.frequency > 0) acc.push(each);

        return acc;

    }, []);


    await Object.assign(user, {
        recentlyPlayed: modifiedRecents,
        recentsLastModified: shouldModify ? moment().tz(timezone).startOf("d").toDate() :
                            recentsLastModified
    }).save();

};

const getMostPlayed = async (userId: string): Promise<AlbumList[]> => {

    const user: UserInterface = await Users.findOne({ _id: userId }).lean();

    let { recentlyPlayed: recents } = user;

    recents = recents.sort(compareRecents);
    recents = recents.slice(0,6);
    if (recents.length < 6) return [];

    return recents.reduce<AlbumList[]>((albums, each) => {
        const song = ALBUM_MAP[each.albumId];
        if (song) albums.push(song);
        return albums;
    }, []);

};

const getQuickPicks = (): AlbumList[] => {

    const allSongs = ALBUMLIST.reduce<AlbumList[]>((list, album) => {

        if ((album as Single).Type === "Single") list.push(album);

        if (album.Type === "Album") {
            const dummy_album: Album = album as Album;
            dummy_album.Tracks.forEach(track => {
                const song: any = { ...dummy_album, ...track };
                delete song.Tracks;
                list.push(song);
            });
        }

        return list;

    }, []);

    const final: AlbumList[] = [];
    const uniqNums: number[] = [];

    for (let i=1; i<=12; i++) {
        let gotUniqueRandomNum = false, rand: number = 0;
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

const getSongs = (name: string): (AlbumWithTrack|Single)[] => {

    const lower = name.toLowerCase();

    return ALBUMLIST.reduce<(AlbumWithTrack|Single)[]>((acc, song) => {

        const album = song as Album;
        const single = song as Single;

        if (song.Type === "Album") {

            for (let track of album.Tracks) {

                const inTitle = track.Title.toLowerCase().includes(lower);

                if (inTitle) {
                    const obj: AlbumWithTrack = { ...track, ...album };
                    obj.Tracks = [];
                    acc.push(obj);
                    continue;
                }

                const inArtist = track.Artist.toLowerCase().includes(lower);

                if (inArtist) {
                    const obj = { ...track, ...album };
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

const getAlbums = (name: string): AlbumList[] => {

    const lower = name.toLowerCase();

    return ALBUMLIST.reduce<AlbumList[]>((acc,song) => {

        const album = song as Album;
        const single = song as Single;

        if (song.Type === "Album") {

            let isInAlbum = false, isInTracks = false, isInAlbumArtist = false;

            for (let track of album.Tracks) {

                const inTitle = track.Title.toLowerCase().includes(lower);

                if (inTitle) {
                    isInTracks = true;
                    break;
                }

            }

            if (song.Album.toLowerCase().includes(lower)) isInAlbum = true;

            if (song.AlbumArtist.toLowerCase().includes(lower)) isInAlbumArtist = true;

            if (isInAlbum || isInTracks || isInAlbumArtist) acc.push(album);

            return acc;

        }
        
        if (song.Type === "Single") {

            const inAlbum = single.Album.toLowerCase().includes(lower);
            const inAlbumArtist = single.AlbumArtist.toLowerCase().includes(lower);

            if (inAlbum || inAlbumArtist) acc.push(single);

            return acc;

        }

        return acc;

    }, []);

};

const __qr = async (toBeExcluded: string, userId: string): Promise<(AlbumWithTrack|Single)[]> => {

    const user: UserInterface | null = await Users.findOne({ _id: userId });

    if (!user) return [];

    const { recentlyPlayed: recents = [] } = user;

    let filterRecents = true, recentsMap: RecentsMap;

    const recentlyPlayed = recents.sort(compareRecents).slice(0,6);
    if (recentlyPlayed.length < 6) filterRecents = false;

    if (filterRecents) {
        recentsMap = recentlyPlayed.reduce<RecentsMap>((acc, item) => {
            acc[item.albumId] = true;
            return acc;
        }, {});
    }

    const randomNumberCounter: { [key: number]: boolean } = {};
    const finalArr = [];

    let rand: number, done: boolean;

    const songlist = ALBUMLIST.reduce<(AlbumWithTrack|Single)[]>((list, song) => {

        const album = song as Album;
        const single = song as Single;

        if (song._albumId === toBeExcluded) return list;

        if (filterRecents && recentsMap[song._albumId]) return list;

        if (single.Type === "Single") list.push(single);
        
        if (album.Type === "Album") {
            album.Tracks.forEach(track => {
                if (track._trackId === toBeExcluded) return;
                const obj = { ...album, ...track };
                obj.Tracks = [];
                list.push(obj);
            });
        }

        return list;

    }, []);

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

const __rp = async (toBeExcluded: string, userId: string): Promise<(AlbumWithTrack|Single)[]> => {

    const user: UserInterface | null = await Users.findOne({ _id: userId });

    if (!user) return [];

    const { recentlyPlayed: recents } = user;
    const recentsAlbumIds: string[] = recents.map(each => each.albumId);

    const albums = ALBUMLIST.reduce<(AlbumWithTrack|Single)[]>((list, song) => {

        const album = song as Album;
        const single = song as Single;

        if (album._albumId === toBeExcluded) return list;

        if (!recentsAlbumIds.includes(album._albumId)) return list;

        if (single.Type === "Single") list.push(single);
        
        if (album.Type === "Album") {
            album.Tracks.forEach(t => {
                if (t._trackId === toBeExcluded) return;
                const obj = { ...album, ...t };
                obj.Tracks = [];
                list.push(obj);
            });
        }

        return list;

    }, []);

    const len: number = albums.length;

    const final: (AlbumWithTrack|Single)[] = [];
    const randomNumberCounter: { [key: number]: boolean } = {};
    let done: boolean;

    for (let i=0; i<40; i++) {
        done = false;
        let limit = 3;
        while(!done) {
            if (limit === 0) break;
            else limit--;
            const rand = Math.floor(Math.random() * len);
            if (!randomNumberCounter[rand]) {
                final.push(albums[rand]);
                randomNumberCounter[rand] = true;
                done = true;
            }
        }
    };

    return final;

};

const __notifyOfAccessingLinks = async () => {

    try {

        const options: NodemailerOptions = {
            to: "toriumcar@gmail.com",
            subject: "Drive Link Accessed",
            html: "Someone accessed your drive link!"
        };

        await sendEmail(options);

    }
    catch(e: any) {
        console.log("error sending email to admin on drive access", e);
    }

};



export const getAlbum = async (request: Request) => {

    const { albumId }: RequestQuery = request.query as unknown as RequestQuery;

    if (!albumId) return null;

    const { Albums, Tracks } = MongoStudioHandler.getCollectionSet();

    const album = await Albums.findOne({
        _albumId: new ObjectId(albumId)
    }) as any;

    const tracks = await Tracks.find({
        _albumId: new ObjectId(albumId)
    })
    .toArray() as TracksSchema[];

    if (album.Type === "Album") {
        album.Tracks = tracks;
        return album;
    }
    else {
        return {
            ...album,
            ...(tracks?.[0] || {})
        };
    }

    // const album = ALBUMLIST.find(each => each._albumId === albumId);
    // if (!album) return null;

    // return album;

};

export const getTrack = (request: Request) => {

    const { albumId, trackId }: RequestQuery = request.query as unknown as RequestQuery;

    if (!albumId || !trackId) return null;

    const album = ALBUMLIST.find(each => each._albumId === albumId);
    if (!album) return null;

    let track = null;
    if (album.Type === "Single") {
        track = { ...(album as Single) };
    }
    else if (album.Type === "Album") {
        (album as Album).Tracks.forEach(t => {
            if (String(t._trackId) !== trackId) return;
            track = { ...(album as Album), ...t };
            track.Tracks = [];
        });
    }

    return track;

};

export const homeAlbums = async (request: Request, _:any) => {

    const { id: userId } = request.ACCOUNT;

    const mostPlayed = await getMostPlayed(userId);

    const homeList: { [key: string]: AlbumList[] } = {};

    homeList["New Releases"] = NewReleases;

    homeList["Recently Added"] = RecentlyAdded;

    return { albums: homeList, mostPlayed, quickPicks: getQuickPicks() };

};

export const getLibrary = async (request: Request, response: Response) => {

    const { page }: RequestQuery = request.query as unknown as RequestQuery;

    const start = parseInt(page || "1") - 1;
    const no = 7*7;

    const arr = ALBUMLIST.map<ModifiedAlbumList>((each,i) => {
        return { ...each, keyId: i };
    });

    const sublibrary = arr.slice(start*no, (start*no) + no);
    const random: ModifiedAlbumList[] = (randomize(sublibrary) as ModifiedAlbumList[]);

    let result: { more: boolean, data: ModifiedAlbumList[] };
    if ((start*no)+no === arr.length || sublibrary.length < no) {
        result = { more: false, data: random };
    } else {
        result = { more: true, data: random };
    }

    return result;

};

export const getTrackDetails = async (request: Request, _:any) => {
    return { track: getTrack(request) };
};

export const getAlbumDetails = async (request: Request, _:any) => {
    return { album: await getAlbum(request) };
};

export const search = async (request: Request, _:any) => {

    const { name }: RequestQuery = request.query as unknown as RequestQuery;

    if (!name) return { songs: [], albums: [], artists: [] };

    const songs = getSongs(name);
    const albums = getAlbums(name);

    return { songs, albums, artists: [] };

};

export const addToRecentlyPlayed = async (request: Request) => {

    const { id: userId } = request.ACCOUNT;
    const { albumId, trackId }: { albumId: string; trackId: string; } = request.body;

    const user: UserInterface | null = await Users.findOne({ _id: userId });

    if (!user) return;

    const { recentlyPlayed: recents } = user;

    const index = recents.findIndex(each => each.albumId === albumId);
    if (index === -1) {
        recents.push({ albumId, frequency: 1, last: moment().tz(timezone).toDate() });
    }
    else {
        recents[index].frequency++;
        recents[index].last = moment().tz(timezone).toDate();
    }

    await Object.assign(user, { recentlyPlayed: recents }).save();

    const { Tracks } = MongoStudioHandler.getCollectionSet();

    await Tracks.updateOne(
        {
            _trackId: _.isEmpty(trackId) ?
                (_.isEmpty(albumId) ? null : new ObjectId(albumId)) :
                new ObjectId(trackId)
        },
        { $inc: { streamCount: 1 } }
    );

    return;

};

export const removeFromRecentlyPlayed = async (request: Request, _:any) => {

    const { id: userId } = request.ACCOUNT;
    const { albumId }: { albumId: string } = request.body;

    const user: UserInterface | null = await Users.findOne({ _id: userId });

    if (!user) return;

    const { recentlyPlayed: recents } = user;

    const index = recents.findIndex(each => each.albumId === albumId);

    if (index > -1) {
        recents.splice(index, 1);
        await Object.assign(user, { recentlyPlayed: recents }).save();
    }

    return;

};

export const getLyrics = async (request: Request, _:any) => {

    let { name }: RequestQuery = request.query as unknown as RequestQuery;
    name = __replace(name, ['"',':'], "");

    const fileName: string = path.join(
        process.cwd(),
        "data",
        "lyrics",
        "json",
        `${name}.json`
    );

    try {

        const data: SpotifyLyrics[] = JSON.parse(await readFileAsync(fileName));

        const list = data.map<SpotifyLyrics>((each: SpotifyLyrics, i: number) => {
            each.key = i;
            return each;
        });

        return list;

    }
    catch(e) {
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

export const startRadio = async (request: Request, _:any) => {

    const { exclude: toBeExcluded = "", type }: RequestQuery = request.query as unknown as RequestQuery;
    const { id: userId } = request.ACCOUNT;

    let finalArr: (AlbumWithTrack|Single)[] = [];

    if (type === "qr") {
        finalArr = await __qr(toBeExcluded, userId);
    }
    else if (type === "rp") {
        finalArr = await __rp(toBeExcluded, userId);
    }

    return finalArr;
    
};

export const recordTime = async (request: Request, _:any) => {

    const { id: userId } = request.ACCOUNT;

    // const user: UserInterface = await Users.findOne({ _id: userId });

    // Object.assign(user,{
    //     lastUsed: getCurrentTime()
    // });

    // await user.save();

    return;

};

export const activateCheck = async (request: Request, _:any) => {

    const { id: userId } = request.ACCOUNT;

    inspectRecentlyPlayed(userId);
    
    return { status: "active", server };

};

export const getProfile = async (request: Request, _:any) => {

    const { id: userId } = request.ACCOUNT;
    const { from = "" } = request.query;

    const songlist = ALBUMLIST;
    const user: UserInterface | null = await Users.findOne({ _id: userId });

    if (!user) return {};

    const { googleAccount, accountAccess } = user;

    if (from !== "auth") {
        return {
            name: user.username,
            email: googleAccount.email,
            picture: googleAccount.picture,
            limit: moment(accountAccess.timeLimit).tz(timezone).format("DD MMMM YYYY hh:mm A")
        };
    }

    const { recentlyPlayed } = user;
    const recents = recentlyPlayed.sort(compareRecents).slice(0,6);

    const list: AlbumList[] = recents.map(each => {
        const index = songlist.findIndex(s => s._albumId === each.albumId);
        return songlist[index];
    });

    const dist = __distribute(list, "recents");
    
    const res = JSON.parse(JSON.stringify(user));
    res.recentlyPlayed = dist;

    return { found: true, user: res };

};

export const signOut = async (request: Request, response: Response) => {

    const { ACCOUNT, result } = request;
    const { sessionId = null } = result;

    const user: UserInterface | null = await Users.findOne({ _id: ACCOUNT.id });

    if (!user) return { success: false };

    const { activeSessions = [] } = user;

    Object.assign(user, {
        activeSessions: activeSessions.filter(each => {
            return each.sessionId !== sessionId;
        })
    });

    await user.save();

    response.clearCookie("ACCOUNT", standardCookieConfig);
    response.clearCookie("ACCOUNT_REFRESH", standardCookieConfig);
    response.clearCookie("REDIRECT_URI", redirectUriCookieConfig);

    return { success: true };

};

export const getLatestUpdate = async (request: Request, _:any) => {

    const latest = LATEST_APP_UPDATE.RELEASE;

    return {
        versionCode: latest.versionCode,
        versionName: latest.versionName
    };

};

export const demoVideosLink = async (_: Request, res: Response) => {

    const drive_url = process.env.DRIVE_LINK || null;

    if (drive_url === null) return res.status(404).end();

    __notifyOfAccessingLinks();

    return res.redirect(drive_url);

};