import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { RH } from "../types";

export const handleRequest: RH = (server) => async (req: Request, res: Response, next: NextFunction) => {
    var token = req.cookies.authToken;
    var decodedToken = jwt.verify(token, server.options.authSecret);
    console.log(decodedToken);
}