import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { ENV, PASSPORT_REDIRECT_APP_URL } from "../helpers/utils";

const GOOGLE_CLIENT_ID: string = ENV("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET: string = ENV("GOOGLE_CLIENT_SECRET");
const ENVIRONMENT: string = ENV("ENVIRONMENT");


const googleStrat: any = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: ENVIRONMENT === "LOCAL" ? "/google-signin" :
                `${PASSPORT_REDIRECT_APP_URL}/google-signin`
};

passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.use(
    new Strategy(googleStrat, (accessToken:any, refreshToken:any, profile:any, done:any) => {
        return done(null, profile);
    })
);