import nodemailer from "nodemailer";
import { google } from "googleapis";
import { ENV } from "../helpers/utils";
import { NodemailerOptions } from "../helpers/interfaces";

const GMAIL_CLIENT_ID: string = ENV("GMAIL_CLIENT_ID");
const GMAIL_CLIENT_SECRET: string = ENV("GMAIL_CLIENT_SECRET");
const GMAIL_REDIRECT_URI: string = ENV("GMAIL_REDIRECT_URI");
const GMAIL_REFRESH_TOKEN: string = ENV("GMAIL_REFRESH_TOKEN");
const GMAIL_USERNAME: string = ENV("GMAIL_USERNAME");


const oAuthClient = new google.auth.OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    GMAIL_REDIRECT_URI
);
oAuthClient.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN });


export const sendEmail = async (options: NodemailerOptions) => {

    const accessToken: any = await oAuthClient.getAccessToken();

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: GMAIL_USERNAME,
            clientId: GMAIL_CLIENT_ID,
            clientSecret: GMAIL_CLIENT_SECRET,
            refreshToken: GMAIL_REFRESH_TOKEN,
            accessToken
        }
    });

    if (!options.from) options.from = "StudioMusic <studiomusiccompany@gmail.com>";

    try {
        return await transport.sendMail(options);
    }
    catch(e) {
        throw e;
    }

};