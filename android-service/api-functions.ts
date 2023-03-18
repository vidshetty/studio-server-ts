import { Request } from "express";
import {
    UserInterface,
    AndroidAlbum,
    Album,
    Single
} from "../helpers/interfaces";
import {
    server,
    randomize
} from "../helpers/utils";
import { Users } from "../models/Users";
import ALBUMLIST from "../data/archiveGateway";



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

    const allAlbums = ALBUMLIST.reduce<AndroidAlbum[]>((acc: AndroidAlbum[], each) => {

        const album: Album = each as Album;
        const single: Single = each as Single;

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

    const sublibrary: AndroidAlbum[] = allAlbums.slice(start*no, (start*no) + no);
    const random: AndroidAlbum[] = (randomize(sublibrary) as AndroidAlbum[]);

    return {
        more: (() => {
            if ((start*no)+no === allAlbums.length) return false;
            if (sublibrary.length < no) return false;
            return true;
        }),
        data: random
    };

};