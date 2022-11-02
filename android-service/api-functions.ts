import { Request } from "express";
import { server } from "../helpers/utils";



export const checkServer = (req: Request) => {

    return { status: "active", server };

};