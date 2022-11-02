import path from "path";
import moment, { Duration } from "moment-timezone";
import jwt from "jsonwebtoken";
import { Request } from "express";
import { Users } from "../models/Users";
import {
    ejsRender,
    buildroot,
    timezone,
    calcPeriod,
    defaultAccess,
    ENV,
    androidAccessTokenExpiry,
    refreshTokenExpiry,
    issuer
} from "../helpers/utils";
import {
    UserInterface,
    JwtPayload,
    GoogleProfileInfo,
    NodemailerOptions
} from "../helpers/interfaces";
import { sendEmail } from "../nodemailer-service";



const ACCESS_TOKEN_SECRET = ENV("ACCESS_TOKEN_SECRET");
const REFRESH_TOKEN_SECRET = ENV("REFRESH_TOKEN_SECRET");

const __notifyAdmin = async (googleAccount: GoogleProfileInfo, type: String) => { // type [signup,getin]

    try {

        const data: string = await ejsRender(
            path.join(process.cwd(), buildroot, "views", "newsignup.ejs"),
            {
                username: googleAccount.name,
                email: googleAccount.email,
                picture: googleAccount.picture
            }
        );

        const options: NodemailerOptions = {
            to: "toriumcar@gmail.com",
            subject: type === "signup" ? "New Sign-Up" : type === "getin" ? "Got Into Player" : "Just Logged In",
            html: data
        };

        sendEmail(options).catch(e => {});

    }
    catch(e) {}

};

const __notifyUser = async (user: UserInterface, type: String) => {

    try {

        const { duration, timeLimit } = user.accountAccess;
        const now = moment().tz(timezone);
        let diff: Duration;
        if (timeLimit) {
            diff = moment.duration(moment(timeLimit).diff(moment(now)));
        }
        else {
            const newdate = moment(now).add(duration,"s").tz(timezone);
            diff = moment.duration(moment(newdate).diff(moment(now).tz(timezone)));
        }

        const period = calcPeriod(diff);

        const data = await ejsRender(
            type === "signup" ?
            path.join(process.cwd(), buildroot, "views", "newsignup_user.ejs") :
            path.join(process.cwd(), buildroot, "views", "login_user.ejs"),
            { 
                period,
                // date,
                // time
            }
        );

        const options = {
            to: user.googleAccount.email,
            subject: type === "signup" ? "You just signed up!" : "You just logged in!",
            html: data
        };

        try {
            await sendEmail(options);
        } catch(e) {
            console.log("email",e);
        }

    } catch(e) {
        console.log("e",e);
        return false;
    }

};


export const accountCheck = async (request: Request) => {

    const { name, email, id, photoUrl }: any = request.body;

    let user = await Users.findOne({ "email.id": email });

    if (user) {

        user.googleAccount = {
            ...user.googleAccount,
            sub: id,
            name,
            email,
            picture: photoUrl
        };

        await user.save();

        __notifyAdmin(user.googleAccount, "login");
        if (user.accountAccess.type !== "expired") __notifyUser(user, "login");

    }
    else {

        //signup

        user = await new Users({
            username: null,
            accountAccess: {
                type: "allowed",
                duration: defaultAccess,
                timeLimit: null,
                seen: false
            },
            email: {
                id: email,
                verificationStatus: "verified"
            },
            googleAccount: {
                exists: true,
                sub: id,
                name,
                email,
                email_verified: true,
                picture: photoUrl
            },
            loggedIn: "signed up",
            status: "active",
            lastUsed: moment().tz(timezone).format("DD MMM YYYY, h:mm:ss a")
        }).save();

        __notifyAdmin(user.googleAccount, "signup");
        __notifyUser(user, "signup");

    }

    const payload: JwtPayload = {
        _id: String(user._id),
        email
    };

    const accessToken: string = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: androidAccessTokenExpiry, issuer });
    const refreshToken: string = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiry, issuer });

    return {
        _id: user._id,
        name,
        email,
        picture: photoUrl,
        accessToken,
        refreshToken
    };

};

export const accessCheck = async (request: Request) => {

    const { user_id = null }: any = request.body;

    const user: UserInterface = await Users.findOne({ _id: user_id });

    const { accountAccess, googleAccount, username, _id } = user;
    const { name, picture, email } = googleAccount;
    const { timeLimit, duration, type, seen } = accountAccess;

    // type [revoked, expired, signup, login]

    if (type === "revoked") {
        return {
            type: "revoked",
            period: null,
            user: { name: username || name, picture, email, _id },
            seen: null
        };
    }

    const [diff, secs] = (() => {

        if (seen) {
            const diff = moment.duration(moment(timeLimit).diff(moment().tz(timezone)));
            const secs = Math.floor(diff.asSeconds());
            return [diff, secs];
        }
        else {
            const now = moment().tz(timezone);
            let diff: Duration;
            if (timeLimit) {
                diff = moment.duration(moment(timeLimit).diff(moment(now)));
            }
            else {
                const newdate = moment(now).add(duration,"s").tz(timezone);
                diff = moment.duration(moment(newdate).diff(moment(now).tz(timezone)));
            }
            const secs = diff.asSeconds();
            return [diff, secs];
        }

    })();

    if (secs <= 30) {
        return {
            type: "expired",
            period: null,
            user: { name: username || name, picture, email, _id },
            seen: null
        };
    }

    if (!user.username) {
        return {
            type: "signup",
            period: calcPeriod(diff),
            user: { name: username || name, picture, email, _id },
            seen
        };
    }

    return {
        type: "login",
        period: calcPeriod(diff),
        user: { name: username || name, picture, email, _id },
        seen
    };

};