import "source-map-support/register";
import { config } from "dotenv";
import path from "path";
import fs from "fs";
config({ path: path.join(process.cwd(), "ENV", ".env") });

import express, { Application, Request, Response } from "express";
import passport from "passport";
import https from "https";
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
// const server = http.createServer(app);

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

app.use("/", staticservice);



https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, "CERTIFICATES", "key.pem")),
        cert: fs.readFileSync(path.join(__dirname, "CERTIFICATES", "cert.pem"))
    },
    app
)
.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});
// server.listen(PORT, () => {
//     console.log(`Running on port ${PORT}`);
// });