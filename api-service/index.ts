import { Router, Request, Response, NextFunction } from "express";
import { apiAuthCheck, apiAccessCheck } from "../auth-service/functions";
import { responseMid } from "../helpers/responsehandler";
import {
    activateCheck,
    getLibrary,
    getProfile,
    homeAlbums,
    recordTime,
    getTrackDetails,
    getAlbumDetails,
    search,
    addToRecentlyPlayed,
    getLyrics,
    signOut,
    startRadio
} from "./functions";


const router = Router();



router.use(apiAuthCheck);

router.get("/whosthis", responseMid(getProfile));

router.use(apiAccessCheck);

// router.use((request: Request, _:Response, next: NextFunction) => {
//     request.ACCOUNT = { id: "60eede351b955d0015eab8e0" };
//     return next();
// });

router.get("/activateCheck", responseMid(activateCheck));

router.get("/recordTime", responseMid(recordTime));

router.get("/getHomeAlbums", responseMid(homeAlbums));

router.get("/getLibrary", responseMid(getLibrary));

router.get("/getTrack", responseMid(getTrackDetails));

router.get("/getAlbumDetails", responseMid(getAlbumDetails));

router.get("/search", responseMid(search));

router.post("/addToRecentlyPlayed", responseMid(addToRecentlyPlayed));

router.get("/getLyrics", responseMid(getLyrics));

router.get("/sign-out", responseMid(signOut));

router.get("/startradio", responseMid(startRadio));

router.get("/goToRedirect", (_,res) => res.redirect("/login"));

// router.get("/whosthis", responseMid(getProfile));

router.use("*", (_:any, response: Response) => {
    return response.status(404).end();
});



export default router;