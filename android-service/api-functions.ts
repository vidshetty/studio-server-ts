import { Request } from "express";
import {
    UserInterface,
    AndroidAlbum,
    Album,
    Single,
    RecentlyPlayed,
    AlbumList,
    AndroidTrack
} from "../helpers/interfaces";
import {
    server,
    randomize,
    convertToAndroidAlbum,
    convertToAndroidTrack
} from "../helpers/utils";
import { Users } from "../models/Users";
import ALBUMLIST, { NewReleases, RecentlyAdded, ALBUM_MAP, ALBUM_LIST_TRACKS } from "../data/archiveGateway";



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



export const checkServer = (req: Request) => {

    return { status: "active", server };

};

export const activeSessions = async (request: Request) => {

    const { id = null } = request.ACCOUNT;
    const { sessionId = null } = request.result;

    const user: UserInterface = await Users.findOne({ _id: id });

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