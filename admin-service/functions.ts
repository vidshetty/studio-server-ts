import { Users } from "../models/Users";
import { Request, Response } from "express";
import moment from "moment-timezone";
import path from "path";
import {
    UserInterface,
    AlbumList,
    Album,
    Single
} from "../helpers/interfaces";
import { sendEmail } from "../nodemailer-service";
import ALBUMLIST from "../data/archiveGateway";
import {
    timezone,
    calcPeriod,
    ejsRender,
    buildroot
} from "../helpers/utils";


interface updateBody {
    email?: string;
    sendEmail?: boolean;
    duration: string | number;
    seen: boolean;
    type: string;
}

interface RequestQuery {
    name?: string;
    id?: string | string[];
}

const emailUser = async (user: UserInterface) => {

    try {

        const { accountAccess, googleAccount } = user;
        const { duration = 0 } = accountAccess;
        const today = moment().tz(timezone);
        const addedToday = moment(today).add(duration,"s");
        const dur = moment.duration(moment(addedToday).diff(moment(today)));

        const period = calcPeriod(dur);
        const date = moment(addedToday).format("DD MMMM YYYY");
        const time = moment(addedToday).format("hh:mm A");

        const data = await ejsRender(
            path.join(process.cwd(), buildroot, "views", "accessextended.ejs"),
            { 
                period,
                date,
                time
            }
        );

        const options = {
            to: googleAccount.email,
            subject: "Access Extended",
            html: data
        };

        try {
            await sendEmail(options);
            return true;
        } catch(e) {
            console.log("e",e);
            return false;
        }

    } catch(e) {
        console.log("e",e);
        return false;
    }

};



export const update = async (request: Request, _:any) => {

    const body: updateBody = {
        email: request.body.email || "",
        duration: request.body.duration || "",
        seen: request.body.seen,
        type: request.body.type || "allowed",
        sendEmail: request.body.sendEmail
    };

    if (body.seen === undefined || body.seen === null) {
        return { message: "add 'seen: boolean' to body" };
    }

    if (body.sendEmail === undefined || body.sendEmail === null) {
        return { message: "add 'sendEmail: boolean' to body" };
    }

    const { email, sendEmail } = body;
    console.log(body);

    delete body.email;
    delete body.sendEmail;

    if (body.duration) {
        const time: string[] = (body.duration as string).split("*");
        const secs = time.reduce<number>((acc, each) => acc * parseFloat(each), 1);
        body.duration = secs;
    }

    const user: UserInterface = await Users.findOne({
        "googleAccount.email": email
    });
    if (!user) return { msg: "No such user." };

    const { accountAccess } = user;
    Object.assign(user,{
        accountAccess: {
            ...accountAccess, ...body,
            timeLimit: null,
            seen: false
        }
    });

    await user.save();

    if (sendEmail) {
        const sent = await emailUser(user);
        return { user, sent };
    }

    return { user, sent: false };

};

export const getUser = async (_:any, _1:any) => {

    const user: UserInterface = await Users.findOne({ _id: "60eede351b955d0015eab8e0" });
    return {
        length: user.recentlyPlayed.length,
        recentlyPlayed: user.recentlyPlayed,
        recentsLastModified: user.recentsLastModified
    };

};

export const getAlbum = async (request: Request, _:any) => {

    const { name }: RequestQuery = request.query as unknown as RequestQuery;

    if (!name) return [];

    return ALBUMLIST.reduce<AlbumList[]>((acc,each) => {

        const album = each as Album;
        const single = each as Single;

        if (each.Type === "Single") {
            if (single.Album.toLowerCase().includes(name.toLowerCase())) {
                acc.push(single);
            }
        }

        if (each.Type === "Album") {
            if (album.Album.toLowerCase().includes(name.toLowerCase())) {
                acc.push(album);
            } else {
                for (let i=0; i<album.Tracks.length; i++) {
                    if (album.Tracks[i].Title.toLowerCase().includes(name.toLowerCase())) {
                        acc.push(album);
                        break;
                    }
                }
            }
        }

        return acc;

    }, []);

};

export const deleteAlbumFromRecents = async (request: Request, _:any) => {

    const { id }: RequestQuery = request.query as unknown as RequestQuery;

    if (!id) return false;

    const allIds: string[] = Array.isArray(id) ? id : [id];

    const allUsers: UserInterface[] = await Users.find();

    for (let i=0; i<allUsers.length; i++) {

        const { recentlyPlayed: recents, _id: userId } = allUsers[i];

        const toBeRemoved = recents.reduce<string[]>((acc,each) => {
            const albumId: string = each.albumId;
            if (allIds.includes(albumId)) acc.push(albumId);
            return acc;
        }, []);

        if (toBeRemoved.length > 0) {
            await Users.updateOne(
                { _id: userId },
                { $pull: { recentlyPlayed: { albumId: { $in: toBeRemoved } } } }
            );
        }

    }

    return true;

};