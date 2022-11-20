import { Request } from "express";
import { UserInterface } from "../helpers/interfaces";
import { server } from "../helpers/utils";
import { Users } from "../models/Users";



export const checkServer = (req: Request) => {

    return { status: "active", server };

};

export const activeSessions = async (request: Request) => {

    const { id = null } = request.ACCOUNT;
    const { sessionId = null } = request.result;

    const user: UserInterface = await Users.findOne({ _id: id });

    const { activeSessions = [] } = user;

    return activeSessions.map(each => {
        const obj: any = { ...each };
        obj.thisDevice = each.sessionId === sessionId;
        return obj;
    });

};