"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixJson = exports.deleteAlbumFromRecents = exports.getAlbum = exports.getUser = exports.update = void 0;
const Users_1 = require("../models/Users");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const path_1 = __importDefault(require("path"));
const nodemailer_service_1 = require("../nodemailer-service");
const archiveGateway_1 = __importDefault(require("../data/archiveGateway"));
const utils_1 = require("../helpers/utils");
const emailUser = async (user) => {
    try {
        const { accountAccess, googleAccount } = user;
        const { duration = 0 } = accountAccess;
        const today = (0, moment_timezone_1.default)().tz(utils_1.timezone);
        const addedToday = (0, moment_timezone_1.default)(today).add(duration, "s");
        const dur = moment_timezone_1.default.duration((0, moment_timezone_1.default)(addedToday).diff((0, moment_timezone_1.default)(today)));
        const period = (0, utils_1.calcPeriod)(dur);
        const date = (0, moment_timezone_1.default)(addedToday).format("DD MMMM YYYY");
        const time = (0, moment_timezone_1.default)(addedToday).format("hh:mm A");
        const data = await (0, utils_1.ejsRender)(path_1.default.join(process.cwd(), utils_1.buildroot, "views", "accessextended.ejs"), {
            period,
            date,
            time
        });
        const options = {
            to: googleAccount.email,
            subject: "Access Extended",
            html: data
        };
        try {
            await (0, nodemailer_service_1.sendEmail)(options);
            return true;
        }
        catch (e) {
            console.log("e", e);
            return false;
        }
    }
    catch (e) {
        console.log("e", e);
        return false;
    }
};
const update = async (request, _) => {
    const body = {
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
        const time = body.duration.split("*");
        const secs = time.reduce((acc, each) => acc * parseFloat(each), 1);
        body.duration = secs;
    }
    const user = await Users_1.Users.findOne({
        "googleAccount.email": email
    });
    if (!user)
        return { msg: "No such user." };
    const { accountAccess } = user;
    Object.assign(user, {
        accountAccess: Object.assign(Object.assign(Object.assign({}, accountAccess), body), { timeLimit: null, seen: false })
    });
    await user.save();
    if (sendEmail) {
        const sent = await emailUser(user);
        return { user, sent };
    }
    return { user, sent: false };
};
exports.update = update;
const getUser = async (_, _1) => {
    const user = await Users_1.Users.findOne({ _id: "620e2e2693c8702fed063743" });
    return {
        length: user.recentlyPlayed.length,
        recentlyPlayed: user.recentlyPlayed,
        recentsLastModified: user.recentsLastModified
    };
};
exports.getUser = getUser;
const getAlbum = async (request, _) => {
    const { name } = request.query;
    if (!name)
        return [];
    return archiveGateway_1.default.reduce((acc, each) => {
        const album = each;
        const single = each;
        if (each.Type === "Single") {
            if (single.Album.toLowerCase().includes(name.toLowerCase())) {
                acc.push(single);
            }
        }
        if (each.Type === "Album") {
            if (album.Album.toLowerCase().includes(name.toLowerCase())) {
                acc.push(album);
            }
            else {
                for (let i = 0; i < album.Tracks.length; i++) {
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
exports.getAlbum = getAlbum;
const deleteAlbumFromRecents = async (request, _) => {
    const { id } = request.query;
    if (!id)
        return false;
    const allIds = Array.isArray(id) ? id : [id];
    const allUsers = await Users_1.Users.find();
    for (let i = 0; i < allUsers.length; i++) {
        const { recentlyPlayed: recents, _id: userId } = allUsers[i];
        const toBeRemoved = recents.reduce((acc, each) => {
            const albumId = each.albumId;
            if (allIds.includes(albumId))
                acc.push(albumId);
            return acc;
        }, []);
        if (toBeRemoved.length > 0) {
            await Users_1.Users.updateOne({ _id: userId }, { $pull: { recentlyPlayed: { albumId: { $in: toBeRemoved } } } });
        }
    }
    return true;
};
exports.deleteAlbumFromRecents = deleteAlbumFromRecents;
const fixJson = async (request, _) => {
    let { name } = request.query;
    name = (0, utils_1.__replace)(name, ['"', ':'], "");
    const fileName = path_1.default.join(process.cwd(), "data", "lyrics", "json", `${name}.json`);
    try {
        const data = JSON.parse(await (0, utils_1.readFileAsync)(fileName));
        const list = data.map((each) => {
            each.startTimeMs = parseInt(`${each.startTimeMs}`);
            return each;
        });
        await (0, utils_1.writeFileAsync)(fileName, JSON.stringify(list));
        return {
            done: true
        };
    }
    catch (e) {
        if (e instanceof Error) {
            return {
                name: e.name,
                msg: e.message
            };
        }
    }
};
exports.fixJson = fixJson;
//# sourceMappingURL=functions.js.map