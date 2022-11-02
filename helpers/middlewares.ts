import { Request, Response, NextFunction } from "express";
import { getAlbum, getTrack } from "../api-service/functions";
import { lookup, Lookup } from "geoip-lite";
import { ejsRender, buildroot, CustomError } from "../helpers/utils";
import path from "path";


export const userAgentCheck = (request: Request, response: Response, next: NextFunction) => {

    const ua: string = (request.headers["user-agent"] || "").toLowerCase();
    let found: boolean = false;
    const notAllowed: string[] = [
        "android",
        "ios",
        "mobile"
    ];

    for (let i=0; i<notAllowed.length; i++) {
        if (ua.includes(notAllowed[i])) {
            found = true;
            break;
        }
    }

    if (found) return response.redirect("/mobileview");

    return next();

};

export const httpsRedirect = (request: Request, response: Response, next: NextFunction) => {

    const allowedHosts: string[] = [
        "localhost:5000",
        "192.168.29.77:5000",
        "localhost:7000",
        "192.168.29.77:7000"
    ];
    const protocol: string | string[] = request.headers["x-forwarded-proto"] || "";
    const host: string = request.headers["host"] || "";
    const isHttps: boolean = protocol === "https";

    let validHost: boolean = false;

    for (let i=0; i<allowedHosts.length; i++) {
        if (allowedHosts[i] === host) {
            validHost = true;
            break;
        }
    }

    if (validHost) return next();
    
    if (!isHttps) return response.redirect(`https://${host}${request.url}`);

    return next();

};

export const ipAddress = (request: Request, response: Response, next: NextFunction) => {

    try {

        const ip: any = request.headers["x-forwarded-for"] || "no 'x-forwarded-for' header";
        const ipData: Lookup | null = lookup(ip);
        // console.log(
        //     "IP address",
        //     ip,
        //     `${(ipData && ipData.city) || "no city"}, ${ipData && ipData.country}`
        // );

    } catch(e) {
    } finally {
        return next();
    }
};

export const updateHtmlHead = async (request: Request) : Promise<string> => {

    const defaultImageUrl: string = "https://studiomusic.herokuapp.com/preview-studio-black.png";

    if (request.url.includes("album")) {

        request.query = { albumId: request.params.albumId };
        const album = getAlbum(request);

        return await ejsRender(
            path.join(process.cwd(), buildroot, "views", "index.ejs"),
            {
                title: album !== null ? `${album.Album} - ${album.AlbumArtist}` : "StudioMusic",
                image: album !== null ? album.Thumbnail : defaultImageUrl
            }
        );

    }

    if (request.url.includes("track")) {

        request.query = {
            albumId: request.params.albumId,
            trackId: request.params.trackId
        };
        const track: any = getTrack(request);

        return await ejsRender(
            path.join(process.cwd(), buildroot, "views", "index.ejs"),
            {
                title: track !== null ? `${track.Title || track.Album} - ${track.AlbumArtist}` : "StudioMusic",
                image: track !== null ? track.Thumbnail : defaultImageUrl
            }
        );

    }

    return "";

};

export const androidErrorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json(err.body);
};