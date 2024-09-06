import { Router } from "express";
import { userAgentCheck } from "../helpers/middlewares";
import { googleAuthCheck, rootAccessCheck, rootAuthCheck } from "../auth-service/functions";
import { setRedirectUriCookie, buildroot } from "../helpers/utils";
import passport from "passport";
import path from "path";
import fs from "fs";

const router = Router();



// static assets file handler
router.get(
    [
        "/mobile/assets/static/*",
        "/main/assets/static/*",
        "/player/assets/static/*"
    ],
    (req,res,next) => {

        const url = req.path as string;
        
        const url_split = url.split("/");

        const folder_name = (() => {
            if (url.includes("/css")) return "css";
            if (url.includes("/js")) return "js";
            if (url.includes("/media")) return "media";
            return null;
        })();

        const build_name = (() => {
            if (url_split[1] === "mobile") return "mobile-build";
            if (url_split[1] === "main") return "main-build";
            if (url_split[1] === "player") return "player-build";
            return null;
        })();

        if (folder_name === null || build_name === null) {
            return res.status(404).end();
        }

        const file_path = path.join(
            process.cwd(),
            buildroot,
            build_name,
            "static",
            folder_name,
            url_split[url_split.length-1]
        );

        if (!fs.existsSync(file_path)) return res.status(404).end();

        return res.status(200).sendFile(file_path);

    }
);

// global assets file handler
router.get(
    [
        "/mobile/assets/*",
        "/main/assets/*",
        "/player/assets/*"
    ],
    (req,res,next) => {

        const url_split = req.path.split("/");

        const file_path = path.join(
            process.cwd(),
            buildroot,
            "player-build",
            url_split[url_split.length-1]
        );

        if (!fs.existsSync(file_path)) return res.status(404).end();

        return res.status(200).sendFile(file_path);

    }
);

// main index html
router.get(
    "/",
    userAgentCheck,
    (req, res, next) => {
        const file_path = path.join(process.cwd(), buildroot, "main-build", "index.html");
        if (!fs.existsSync(file_path)) return res.status(404).end();
        return res.status(200).sendFile(file_path);
    }
);

// player index html
router.get(
    [
        "/player",
        "/player/search",
        "/player/album/:albumId",
        "/player/album/:albumId/playable",
        "/player/track/:albumId/:trackId",
        "/player/track/:albumId/:trackId/playable"
    ],
    userAgentCheck,
    rootAuthCheck,
    rootAccessCheck,
    (req, res, next) => {

        const { result } = req;

        if (!result.found) {
            setRedirectUriCookie(req.url, res);
            return res.redirect("/");
        }

        const file_path = path.join(process.cwd(), buildroot, "player-build", "index.html");

        if (!fs.existsSync(file_path)) return res.status(404).end();

        return res.status(200).sendFile(file_path);

        // if (
        //     request.path === "/player" ||
        //     request.path === "/player/search"
        // ) {

        //     if (!result.found) {
        //         setRedirectUriCookie(request.url, response);
        //         return response.redirect("/");
        //     }
        //     return response.sendFile(path.join(process.cwd(), buildroot, "player-build", "index.html"));

        // }
        // else {

        //     if (!result.found) setRedirectUriCookie(request.url, response);
        //     const data: string = await updateHtmlHead(request);
        //     return response.send(data);

        // }

    }
);

// player redirect
router.get(
    "/player*",
    (req, res, next) => {
        return res.redirect("/player");
    }
);

// mobile index html
router.get(
    "/mobileview",
    (req, res, next) => {
        const file_path = path.join(process.cwd(), buildroot, "mobile-build", "index.html");
        if (!fs.existsSync(file_path)) return res.status(404).end();
        return res.status(200).sendFile(file_path);
    }
);

// google sign in
router.get(
    "/google-signin",
    passport.authenticate("google", { failureRedirect: "/login?status=failed", session: false }),
    googleAuthCheck,
    (req, res, next) => {
        if (res.user.error) {
            return res.redirect("/login?status=success&email=exists");
        }
        return res.redirect(`/google-oauth-signin/${res.user._id}`);
    }
);

// google auth
router.get(
    "/google-oauth-signin/*",
    userAgentCheck,
    (req, res, next) => {
        const file_path = path.join(process.cwd(), buildroot, "main-build", "index.html");
        if (!fs.existsSync(file_path)) return res.status(404).end();
        return res.status(200).sendFile(file_path);
    }
);

// anything else
router.get(
    "/*",
    (req, res, next) => {
        return res.redirect("/");
    }
);



export default router;