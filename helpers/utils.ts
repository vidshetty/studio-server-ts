import { Request, Response, CookieOptions } from "express";
import moment, { Duration } from "moment-timezone";
import ejs from "ejs";
import { CookieInterface } from "../helpers/interfaces";



export const ENV = (type: string) : string => {
    return process.env[type] || "";
};

export const wait = (time: number) => {
    return new Promise((resolve,_) => setTimeout(resolve, time));
};

export const ejsRender = (path: string, values: any): Promise<string> => {
    return new Promise((resolve,reject) => {
        ejs.renderFile(path, values, (err,data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

export const date = (val: string) : Date => moment(val,"DD-MM-YYYY").toDate(); 

export const server = (() : string[] => {

    const SERVER: string = ENV("SERVER");

    if (SERVER === "MAIN") {
        return [
            `https://songserver1.herokuapp.com`, //0
            `https://songserver2.herokuapp.com`, //1
            `https://songserver3.herokuapp.com`, //2
            `https://songserver4.herokuapp.com`  //3
        ];
    }
    if (SERVER === "BACKUP1") {
        return [
            `https://songserver1-backup1.herokuapp.com`, //0
            `https://songserver2-backup1.herokuapp.com`, //1
            `https://songserver3-backup1.herokuapp.com`, //2
            `https://songserver4-backup1.herokuapp.com`  //3
        ];
    }
    if (SERVER === "BACKUP2") {
        return [
            `https://songserver1-backup2.herokuapp.com`, //0
            `https://songserver2-backup2.herokuapp.com`, //1
            `https://songserver3-backup2.herokuapp.com`, //2
            `https://songserver4-backup2.herokuapp.com`  //3
        ];
    }

    return [];

})();

export const cookieParser = (request: Request): CookieInterface => {

    const cookies: string | undefined = request.headers.cookie;

    const obj: CookieInterface = {};
    if (cookies === "" || cookies === undefined) return obj;

    const removedSpaces = cookies.split(" ").join("");
    const separated = removedSpaces.split(";");
    
    for (let i=0; i<separated.length; i++) {
        const split = separated[i].split("=");
        if (split[0] !== "ACCOUNT" && split[0] !== "ACCOUNT_REFRESH") continue;
        obj[split[0]] = split[1];
    }

    return obj;

};

export const standardCookieConfig: CookieOptions = {
    sameSite: "none",
    secure: true,
    domain: ENV("ENVIRONMENT") === "LOCAL" ? "localhost" : 
            "studiomusic.herokuapp.com",
    maxAge: 40 * 24 * 60 * 60 * 1000,
    httpOnly: true
};

export const redirectUriCookieConfig: CookieOptions = {
    sameSite: "none",
    secure: true,
    domain: ENV("ENVIRONMENT") === "LOCAL" ? "localhost" : 
            "studiomusic.herokuapp.com",
    maxAge: 5 * 60 * 1000,
    httpOnly: true
};

export const setRedirectUriCookie = (path: string, response: Response) => {
    response.cookie("REDIRECT_URI", path, redirectUriCookieConfig);
};

export const calcPeriod = (duration: Duration): string => {

    const __math = (val: number): number => Math.floor(val);

    const seconds = __math(duration.asSeconds());
    const mins = __math(duration.asMinutes());
    const hours = __math(duration.asHours());
    const days = __math(duration.asDays());
    const months = __math(duration.asMonths());
    const years = __math(duration.asYears());

    if (years > 0) {
        // if (years > 1) return "unlimited";
        let time = `${years} ${years > 1 ? "years" : "year"}`;
        const rem = months - (years * 12);
        if (rem > 0) time += ` ${rem} ${rem > 1 ? "months" : "month"}`;
        return time;
    }
    
    if (months > 0) {
        let time = `${months} ${months > 1 ? "months" : "month"}`;
        const rem = days - (months * 30);
        if (rem > 0) time += ` ${rem} ${rem > 1 ? "days" : "day"}`;
        return time;
    }
    
    if (days > 0) {
        let time = `${days} ${days > 1 ? "days" : "day"}`;
        const rem = hours - (days * 24);
        if (rem > 0) time += ` ${rem} ${rem > 1 ? "hours" : "hour"}`;
        return time;
    }
    
    if (hours > 0) {
        let time = `${hours} ${hours > 1 ? "hours" : "hour"}`;
        const rem = mins - (hours * 60);
        if (rem > 0) time += ` ${rem} ${rem > 1 ? "minutes" : "minute"}`;
        return time;
    }
    
    if (mins > 0) {
        return `${mins} ${mins > 1 ? "minutes" : "minute"}`;
    }
    
    if (seconds > 0) {
        return `${seconds} ${seconds > 1 ? "seconds" : "second"}`;
    }

    return "";

};

export const checkRedirectUri = (request: Request): string | null => {

    const cookies: string|undefined = request.headers.cookie;
    const obj: CookieInterface = {};

    if (cookies === "" || cookies === undefined) return null;

    const removedSpaces = cookies.split(" ").join("");
    const separated = removedSpaces.split(";");

    for (let i=0; i<separated.length; i++) {
        const split: string[] = separated[i].split("=");
        if (split[0] !== "REDIRECT_URI") continue;
        obj[split[0]] = split[1];
    }

    const uri = obj["REDIRECT_URI"];

    return (
        uri && 
        uri.replace(/%2F/g, "/").replace(/%3F/g,"?").
            replace(/%3D/g,"=").replace(/%26/g,"&")
    ) || null;

};

export const defaultAccess = 20*60;
export const timezone = "Asia/Kolkata";
export const accessTokenExpiry = "1h";
export const refreshTokenExpiry = "30d";
export const issuer = "StudioMusic";
export const buildroot = "builds";