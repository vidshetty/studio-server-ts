import { Request, Response, NextFunction } from "express";


const corshandler = (_: any, response: Response, next: NextFunction) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    return next();
};


export default corshandler;