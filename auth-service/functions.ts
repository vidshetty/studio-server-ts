import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import path from "path";
import moment, { Duration } from "moment-timezone";
import { Users } from "../models/Users";
import {
    server,
    defaultAccess,
    timezone,
    ejsRender,
    buildroot,
    accessTokenExpiry,
    refreshTokenExpiry,
    issuer,
    standardCookieConfig,
    redirectUriCookieConfig,
    setRedirectUriCookie,
    calcPeriod,
    checkRedirectUri,
    ENV,
    cookieParser,
    CustomError,
    getDevice,
    getCurrentTime
} from "../helpers/utils";
import {
    UserInterface,
    JwtPayload,
    RefreshTokenResponse,
    FoundResponse,
    CookieInterface,
    GoogleProfileInfo,
    NodemailerOptions,
    ActiveSession
} from "../helpers/interfaces";
import { sendEmail } from "../nodemailer-service";



const ACCESS_TOKEN_SECRET = ENV("ACCESS_TOKEN_SECRET");
const REFRESH_TOKEN_SECRET = ENV("REFRESH_TOKEN_SECRET");

interface RequestQuery {
    userId?: string;
};

const __verifyAccessToken = async (token: string): Promise<FoundResponse> => {

    const obj: JwtPayload = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
    const { _id, sessionId = null } = obj;

    if (sessionId === null) return { found: false, id: null, user: null };

    const user: UserInterface | null = await Users.findOne({ _id });

    if (!user) return { found: false, id: null, user: null };

    const index = user.activeSessions.findIndex(each => {
        return each.sessionId === sessionId;
    });

    if (index < 0) return { found: false, id: null, user: null };

    return { found: true, id: _id, user, sessionId };

};

const __generateAccessToken = async (token: string): Promise<RefreshTokenResponse> => {

    let payload: JwtPayload;

    try {
        payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;
    }
    catch(e) {
        throw e;
    }

    const user: UserInterface | null = await Users.findOne({ _id: payload._id });

    if (!user) return { accessToken: null, id: null };
    
    const newPayLoad: JwtPayload = {
        _id: user._id,
        email: user.googleAccount.email,
        sessionId: payload.sessionId
    };

    const accessToken: string = jwt.sign(newPayLoad, ACCESS_TOKEN_SECRET, { expiresIn: accessTokenExpiry, issuer });

    return { accessToken, id: String(user._id) };

};

const __refreshAccessToken = async (request: Request): Promise<RefreshTokenResponse> => {

    const cookieObj: CookieInterface = cookieParser(request);
    const refreshToken = cookieObj.ACCOUNT_REFRESH;

    if (!refreshToken) return { accessToken: null, id: null };
    return await __generateAccessToken(refreshToken);

};

const __cookieFound = async (request: Request): Promise<FoundResponse> => {
    const cookieObj = cookieParser(request);
    const token = cookieObj.ACCOUNT;
    if (!token) return { found: false, id: null, user: null };
    return await __verifyAccessToken(token);
};

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

const __setExpired = async (userId: string) => {

    const update = await Users.updateOne(
        { _id: userId },
        { "accountAccess.type": "expired" }
    );

};


export const googleAuthCheck = async (request: Request, response: Response, next: NextFunction) => {

    const { sub, name, picture, email, email_verified }: any = request.user?._json;

    let user: UserInterface | null = await Users.findOne({ "email.id": email });

    const sessionId: string = uuidv4();
    
    if (user) {

        const { activeSessions = [] } = user;

        activeSessions.push({
            seen: false,
            device: getDevice(request),
            sessionId,
            lastUsed: getCurrentTime()
        });

        Object.assign(user, {
            googleAccount: {
                ...user.googleAccount,
                sub,
                name,
                email,
                picture
            },
            activeSessions
        });

        await user.save();

        response.user = {
            _id: user._id || "",
            error: false
        };

        __notifyAdmin(user.googleAccount, "login");
        if (user.accountAccess.type !== "expired") __notifyUser(user, "login");

    }
    else {

        //signup

        const new_user = await new Users({
            username: null,
            accountAccess: {
                type: "allowed",
                duration: defaultAccess,
                timeLimit: null
            },
            email: {
                id: email,
                verificationStatus: email_verified ? "verified" : "pending"
            },
            googleAccount: { exists: true, sub, name, email, email_verified, picture },
            loggedIn: "signed up",
            status: "active",
            activeSessions: [{
                seen: false,
                device: getDevice(request),
                sessionId,
                lastUsed: getCurrentTime()
            }]
        });

        user = (new_user?.save() as unknown as UserInterface);

        response.user = {
            _id: user._id || "",
            error: false
        };

        __notifyAdmin(user.googleAccount, "signup");
        __notifyUser(user, "signup");

    }

    const payload: JwtPayload = {
        _id: String(user._id),
        email,
        sessionId
    };

    const accessToken: string = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: accessTokenExpiry, issuer });
    const refreshToken: string = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: refreshTokenExpiry, issuer });

    response.cookie("ACCOUNT", accessToken, standardCookieConfig);
    response.cookie("ACCOUNT_REFRESH", refreshToken, standardCookieConfig);

    return next();

};

export const requestAccess = async (request: Request, _:any) => {

    const { userId }: RequestQuery = request.query as unknown as RequestQuery;

    const { found, user: userFromCookie } = await __cookieFound(request);

    if (!found || !userFromCookie) return { error: true };
    if (String(userFromCookie._id) !== userId) return { error: true };

    const { googleAccount } = userFromCookie; 

    try {

        const data = await ejsRender(
            path.join(process.cwd(), buildroot, "views", "newsignup.ejs"),
            {
                username: googleAccount.name,
                email: googleAccount.email,
                picture: googleAccount.picture
            }
        );

        const options = {
            to: "toriumcar@gmail.com",
            subject: "Request More Time",
            html: data
        };

        return sendEmail(options)
        .then(() => {
            return { requestSent: true };
        })
        .catch(e => {
            return { requestSent: false };
        });

    } catch(e) {
        return { requestSent: false };
    }

};

export const servertypes = (_:any, _1:any) => {
    return server;
};

export const apiAuthCheck = async (request: Request, response: Response, next: NextFunction) => {

    try {

        const result = await __cookieFound(request);
        if (result.found) {
            request.result = result;
            request.ACCOUNT = { id: result.id || "" };
            return next();
        }
        else {
            return response.status(200).send({ redirect: true, to: "/" });
        }

    }
    catch(e) {

        if (e instanceof Error && e.name === "TokenExpiredError") {
            try {
                const result = await __refreshAccessToken(request);
                request.result = result;
                if (result.accessToken) {
                    response.cookie("ACCOUNT", result.accessToken, standardCookieConfig);
                    request.ACCOUNT = { id: result.id || "" };
                    return next();
                }
                else {
                    return response.status(200).send({ redirect: true, to: "/" });
                }
            } catch(e) {
                return response.status(200).send({ redirect: true, to: "/" });
            }
        }

        return response.status(200).send({ redirect: true, to: "/" });

    }

};

export const apiAccessCheck = async (request: Request, response: Response, next: NextFunction) => {

    const { result } = request;
    const { found, id, user, sessionId = null } = result;

    if (!found) return next();
    if (!id || !user) return next();

    const { accountAccess, activeSessions = [] } = user;
    const { timeLimit, type } = accountAccess;

    const curSession: ActiveSession|undefined = activeSessions.find(each => {
        return each.sessionId === sessionId;
    });

    const { seen = false } = curSession || {};

    await Object.assign(user, {
        activeSessions: activeSessions.map(each => {
            if (each.sessionId !== sessionId) return each;
            each.lastUsed = getCurrentTime();
            return each;
        })
    }).save();

    if (type === "under_review" || type === "revoked" || !seen) {
        // const uid = await __uidToRedirect(user._id);
        return response.status(200).send({ redirect: true, to: `/google-oauth-signin/${id}` });
    }

    const diff = moment.duration(moment(timeLimit).diff(moment().tz(timezone)));
    const secs = diff.asSeconds();

    if (secs <= 30) {
        // const uid = await __uidToRedirect(user._id);
        __setExpired(id);
        return response.status(200).send({ redirect: true, to: `/google-oauth-signin/${id}` });
    }
    else return next();

};

export const rootAuthCheck = async (request: Request, response: Response, next: NextFunction) => {

    try {
        request.result = await __cookieFound(request);
    }
    catch(e) {

        if (e instanceof Error && e.name === "TokenExpiredError") {

            try {

                const result: RefreshTokenResponse = await __refreshAccessToken(request);
                if (result.accessToken) {
                    response.cookie("ACCOUNT", result.accessToken, standardCookieConfig);
                    request.result = { found: true, id: null, user: null };
                } else {
                    request.result = { found: false, id: null, user: null };
                }

            }
            catch(e) {
                request.result = { found: true, id: null, user: null };
            }

        }
        else {
            request.result = { found: true, id: null, user: null };
        }

    }
    finally {
        next();
    }

};

export const rootAccessCheck = async (request: Request, response: Response, next: NextFunction) => {

    const { result } = request;
    const { found, id, user, sessionId = null } = result;
    let shouldRedirect = false;

    if (!found) return next();

    if (!id || !user) return next();

    const { accountAccess, activeSessions = [] } = user;
    const { timeLimit, type } = accountAccess;

    const curSession: ActiveSession|undefined = activeSessions.find(each => {
        return each.sessionId === sessionId;
    });
    
    const { seen = false } = curSession || {};

    if (type === "under_review" || type === "revoked" || !seen) shouldRedirect = true;

    const diff = moment.duration(moment(timeLimit).diff(moment().tz(timezone)));
    const secs = diff.asSeconds();
    if (secs <= 30) {
        __setExpired(id);
        shouldRedirect = true;
    }

    if (shouldRedirect) {
        setRedirectUriCookie(request.path, response);
        return response.redirect(`/google-oauth-signin/${id}`);
    }

    return next();

};

export const oauthCheck = async (request: Request, _:any) => {

    const { userId }: { userId: string } = request.body;

    const { found, user: userFromCookie, sessionId = null } = await __cookieFound(request);

    if (!found || !userFromCookie) return { error: true };
    if (String(userFromCookie._id) !== userId) return { error: true };

    const user: UserInterface | null = await Users.findOne({ _id: userId });

    if (!user) return { error: true };

    const { accountAccess, googleAccount, username, _id, loggedIn, activeSessions = [] } = user;
    const { name, picture, email } = googleAccount;
    const { timeLimit, duration, type } = accountAccess;
    
    const curSession: ActiveSession|undefined = activeSessions.find(each => {
        return each.sessionId === sessionId;
    });

    const { seen = false } = curSession || {};

    // await Object.assign(user, { accountAccess }).save();

    if (type === "under_review") {
        return {
            status: 404,
            type: "under_review",
            user: { name: username || name , picture, email, _id }
        };
    }

    if (type === "revoked") {
        return {
            status: 404,
            type: "revoked",
            user: { name: username || name, picture, email, _id }
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
            status: 404,
            type: "expired",
            request_button: true,
            user: { name: username || name, picture, email, _id }
        };
    }

    if (!user.username) {
        return {
            // status: 400,
            set_username: true,
            period: calcPeriod(diff),
            user: { name: username || name, picture, email, _id },
            newSignUp: loggedIn === "signed up"
        };
    }
    else {
        return {
            // status: 400,
            only_button: true,
            period: calcPeriod(diff),
            user: { name: username || name, picture, email, _id },
            newSignUp: loggedIn === "signed up"
        };
    }

};

export const continueAuthSignin = async (request: Request, response: Response) => {

    const { username, userId }: { username: string, userId: string } = request.body;

    const { found, user: userFromCookie, sessionId = null } = await __cookieFound(request);

    if (!found || !userFromCookie) return { error: true };
    if (String(userFromCookie._id) !== userId) return { error: true };

    const user: UserInterface | null = await Users.findOne({ _id: userId });

    if (!user) return { error: true };

    const { googleAccount, activeSessions = [] } = user;
    let { accountAccess } = user;

    for (let i=0; i<activeSessions.length; i++) {
        const { sessionId: curSessionId } = activeSessions[i];
        if (curSessionId !== sessionId) continue;
        Object.assign(activeSessions[i], {
            seen: true
        });
        break;
    }

    Object.assign(user, {
        username: username !== "" ? username : user.username,
        loggedIn: "logged in",
        accountAccess: {
            ...accountAccess,
            timeLimit: accountAccess.timeLimit || moment().tz(timezone).add(accountAccess.duration,"s").toDate()
        },
        activeSessions
    });
    
    await user.save();

    const redirectUri = checkRedirectUri(request);
    if (redirectUri !== null) response.clearCookie("REDIRECT_URI", redirectUriCookieConfig);

    __notifyAdmin(user.googleAccount, "getin");

    return {
        success: true,
        username: user.username,
        userId: String(user._id),
        email: googleAccount.email,
        picture: googleAccount.picture,
        status: "loggedin",
        redirectUri: redirectUri || "/player"
    };
    
};

export const signOut = async (request: Request, response: Response) => {

    const { userId }: { userId: string } = request.body;

    const { found, user: userFromCookie, sessionId = null } = await __cookieFound(request);

    if (!found || !userFromCookie) return { error: true };
    if (String(userFromCookie._id) !== userId) return { error: true };

    const user: UserInterface | null = await Users.findOne({ _id: userId });

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

    return { success: true };

};

export const androidApiAuthCheck = async (request: Request, _: Response, next: NextFunction) => {

    const { accesstoken = null }: any = request.headers;

    // access token error -> redirect to login page
    const err1: CustomError = new CustomError(null, {
        middleware: true,
        status: "failed",
        errorType: 1
    });

    if (accesstoken === null) return next(err1);

    try {

        const result = await __verifyAccessToken(accesstoken);
        
        if (!result.found) return next(err1);

        request.result = result;
        request.ACCOUNT = { id: result.id || "" };

        return next();

    }
    catch(e) {
        return next(err1);
    }

};

export const androidApiAccessCheck = async (request: Request, _: Response, next: NextFunction) => {

    const { result } = request;
    const { found, id, user, sessionId = null } = result;

    // access expired -> redirect to profile check page
    const err2: CustomError = new CustomError(null, {
        middleware: true,
        status: "failed",
        errorType: 2
    });

    if (!found) return next();
    if (!id || !user) return next();

    const { accountAccess, activeSessions = [] } = user;
    const { timeLimit, type } = accountAccess;

    const curSession: ActiveSession|undefined = activeSessions.find(each => {
        return each.sessionId === sessionId;
    });

    const { seen = false } = curSession || {};

    await Object.assign(user, {
        activeSessions: activeSessions.map(each => {
            if (each.sessionId !== sessionId) return each;
            each.lastUsed = getCurrentTime();
            return each;
        })
    }).save();

    if (type === "under_review" || type === "revoked" || !seen) {
        return next(err2);
    }

    const diff = moment.duration(moment(timeLimit).diff(moment().tz(timezone)));
    const secs = diff.asSeconds();

    if (secs <= 30) {
        __setExpired(id);
        return next(err2);
    }

    return next();

};