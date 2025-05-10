import { Router, Response } from "express";
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
    startRadio,
    getLatestUpdate,
    demoVideosLink,
    getOriginalResumeLink
} from "./functions";
import { MAIN_URL } from "../helpers/utils";


const router = Router();


router.get("/getLatestUpdate", responseMid(getLatestUpdate));

router.get("/link/:id/:linkType", getOriginalResumeLink);

router.get("/links/demo-videos", demoVideosLink);

router.use(apiAuthCheck);

router.get("/whosthis", responseMid(getProfile));

router.use(apiAccessCheck);

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

router.get("/goToRedirect", (_,res) => res.redirect(MAIN_URL + "/login"));

router.use("*", (_:any, response: Response) => {
    return response.status(404).end();
});



export default router;