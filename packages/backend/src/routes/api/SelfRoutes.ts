import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { BadRequest, NotFound, RequestDenied } from "../../api/exceptions/Exceptions";
import { ClientUser } from "../../models/ClientUser";
import * as User from "../../models/User";
import { RH } from "../types";

interface TokenPayload {
    iat: number,
    id: string
}

export const handleRequest: RH = (server) => async (req: Request, res: Response, next: NextFunction) => {
    var token = req.headers.authorization?.split(' ')[1];

    if(token) {
        var payload: TokenPayload = jwt.verify(token, server.options.authSecret) as TokenPayload;

        const requestedUser = await User.fromID(payload.id, { with_meta: true, with_posts: false });

        if(!requestedUser) return res.status(404).json(new NotFound("Requested User does not exist"));

        return res.status(200).json(requestedUser);

    }

    return res.status(400).json(new BadRequest("Missing Parameters"))

}