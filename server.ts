import "source-map-support/register";
import { config } from "dotenv";
import path from "path";
import fs from "fs";
config({ path: path.join(process.cwd(), "ENV", ".env") });

import express, { Application, Request, Response } from "express";
import passport from "passport";
import https from "https";
import http from "http";
import "./nodemailer-service";
import "./passport-service";
import staticservice from "./helpers/static-content";
import mongohandler from "./helpers/mongohandler";
import corshandler from "./helpers/corshandler";
import authservice from "./auth-service";
import apiservice from "./api-service";
import adminservice from "./admin-service";
import androidservice from "./android-service";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "5000");
const PROTOCOL: string = process.env.PROTOCOL || "http";

mongohandler();



app.use(passport.initialize());
app.use(corshandler);
app.use(express.json());



app.options("*", (_:Request, res:Response) => {
    return res.status(200).end();
});

app.use("/admin", adminservice);

app.use("/api/auth", authservice);

app.use("/api", apiservice);

app.use("/android", androidservice);

app.get("/login/google", passport.authenticate("google", {
    scope: ["profile","email"]
}));

app.get("/.well-known/assetlinks.json", (_:Request, response:Response) => {
    const file_path = path.join(process.cwd(), "data", "assetlinks.json");
    response.sendFile(file_path);
});

app.use("/", staticservice);



if (PROTOCOL === "http") {
    http
    .createServer(app)
    .listen(PORT, () => {
        console.log(`Running on http port ${PORT}`);
    });
}
else {
    https.createServer(
        {
            key: fs.readFileSync(path.join(process.cwd(), "CERTIFICATES", "key.pem")),
            cert: fs.readFileSync(path.join(process.cwd(), "CERTIFICATES", "cert.pem"))
        },
        app
    )
    .listen(PORT, () => {
        console.log(`Running on https port ${PORT}`);
    });
}
// server.listen(PORT, () => {
//     console.log(`Running on port ${PORT}`);
// });