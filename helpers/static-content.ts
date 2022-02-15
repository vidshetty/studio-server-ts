import { Request, Response, NextFunction, Router } from "express";
import { ipAddress, httpsRedirect, userAgentCheck, updateHtmlHead } from "../helpers/middlewares";
import { googleAuthCheck, rootAccessCheck, rootAuthCheck } from "../auth-service/functions";
import { setRedirectUriCookie, buildroot } from "../helpers/utils";
import passport from "passport";
import path from "path";
import staticrouter from "./staticrouter";
import playerstaticrouter from "./playerstaticrouter";

const router = Router();



const exists = (file: string, path: string): boolean => {
    return path.includes(file);
};

const getpath = (file: string): string => {
    return path.join(process.cwd(), buildroot, "player-build", file);
};



router.use("/static", staticrouter);

router.use([
    "/player/static",
    "/player/album/static",
    "/player/album/*/static",
    "/player/track/*/static"
], playerstaticrouter);



router.get("/*", (request: Request, response: Response, next: NextFunction) => {

    let returnpath: string | null = null;

    if (exists("preview-studio-black.png", request.path)) returnpath = getpath("preview-studio-black.png");
    if (exists("preview-studio-white.png", request.path)) returnpath = getpath("preview-studio-white.png");
    if (exists("preview-studiomusic-black.png", request.path)) returnpath = getpath("preview-studiomusic-black.png");
    if (exists("preview-studiomusic-white.png", request.path)) returnpath = getpath("preview-studiomusic-white.png");
    if (exists("preview-studiomusic-white.svg", request.path)) returnpath = getpath("preview-studiomusic-white.svg");

    if (exists("latest-bluewhite.png", request.path)) returnpath = getpath("latest-bluewhite.png");

    if (exists("latest-bluewhite.svg", request.path)) returnpath = getpath("latest-bluewhite.svg");

    if (exists("latest-bluetransparent.png", request.path)) returnpath = getpath("latest-bluetransparent.png");

    if (exists("latest-bluetransparent.svg", request.path)) returnpath = getpath("latest-bluetransparent.svg");

    if (exists("latest-blueblack.png", request.path)) returnpath = getpath("latest-blueblack.png");

    if (exists("latest-blueblack-black.png", request.path)) returnpath = getpath("latest-blueblack-black.png");

    if (exists("latest-blueblack-black.svg", request.path)) returnpath = getpath("latest-blueblack-black.svg");

    if (exists("latest-blueblack-transparent.png", request.path)) returnpath = getpath("latest-blueblack-transparent.png");

    if (exists("latest-blueblack-transparent.svg", request.path)) returnpath = getpath("latest-blueblack-transparent.svg");

    if (exists("latest-blueblack.svg", request.path)) returnpath = getpath("latest-blueblack.svg");

    if (exists("latest-blueblack.jpg", request.path)) returnpath = getpath("latest-blueblack.jpg");

    if (exists("latest-blueblack.ico", request.path)) returnpath = getpath("latest-blueblack.ico");

    if (exists("16x16.png", request.path)) returnpath = getpath("16x16.png");

    if (exists("32x32.png", request.path)) returnpath = getpath("32x32.png");

    if (exists("192x192.png", request.path)) returnpath = getpath("192x192.png");

    if (exists("manifest.json", request.url)) returnpath = getpath("manifest.json");

    if (exists("registerSW.js", request.url)) returnpath = getpath("registerSW.js");

    if (exists("sw.js", request.url)) returnpath = getpath("sw.js");

    if (!returnpath) return next();
    else return response.sendFile(returnpath);

});

router.get(
    "/google-oauth-signin/*",
    userAgentCheck,
    httpsRedirect,
    (_:any, response: Response) => {
        return response.sendFile(path.join(process.cwd(), buildroot, "build", "index.html"));
    }
);

router.get(
    "/google-signin",
    passport.authenticate("google", { failureRedirect: "/login?status=failed" }),
    googleAuthCheck,
    (_:any, response: Response) => {
        if (response.user.error) {
            return response.redirect("/login?status=success&email=exists");
        }
        return response.redirect(`/google-oauth-signin/${response.user._id}`);
    }
);

router.get(
    [
        "/player",
        "/player/search"
    ],
    ipAddress,
    userAgentCheck,
    httpsRedirect,
    rootAuthCheck,
    rootAccessCheck,
    (request: Request, response: Response) => {

        const { result } = request;

        if (!result.found) {
            setRedirectUriCookie(request.url, response);
            return response.redirect("/");
        }

        return response.sendFile(path.join(process.cwd(), buildroot, "player-build", "index.html"));

    }
);

router.get(
    [
        "/player/album/:albumId",
        "/player/album/:albumId/*",
        "/player/track/:albumId/:trackId",
        "/player/track/:albumId/:trackId/*"
    ],
    ipAddress,
    userAgentCheck,
    httpsRedirect,
    async (request: Request, response: Response) => {

        const data: string = await updateHtmlHead(request);
        return response.send(data);

    }
);

router.get(
    "/",
    ipAddress,
    userAgentCheck,
    httpsRedirect,
    (_:any, response: Response) => {
        return response.sendFile(path.join(process.cwd(), buildroot, "build", "index.html"));
    }
);

router.get("/player*", (_:any, response: Response) => {
    return response.redirect("/player");
});

router.get(
    "/mobileview",
    httpsRedirect,
    (_:any, response: Response) => {
        return response.sendFile(path.join(process.cwd(), buildroot, "mobile-build", "index.html"));
    }
);

router.get("/*", (_:any, response: Response) => {
    return response.redirect("/");
});



export default router;