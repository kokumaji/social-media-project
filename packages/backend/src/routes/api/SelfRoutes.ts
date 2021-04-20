import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { BadRequest, RequestDenied } from "../../api/exceptions/Exceptions";
import { ClientUser } from "../../models/ClientUser";
import { User } from "../../models/User";
import { RH } from "../types";

interface TokenPayload {
    iat: number,
    id: string
}

export const handleRequest: RH = (server) => async (req: Request, res: Response, next: NextFunction) => {
    var token = req.headers.authorization?.split(' ')[1];

    if(token) {
        var payload: TokenPayload = jwt.verify(token, server.options.authSecret) as TokenPayload;

        var clientUser = await ClientUser.findOne({ id: payload.id });

        if(!clientUser) return res.status(404).json(new BadRequest("User does not exist"));

        const clientProfile = await User.findOne({username: clientUser?.username }, { _id: 0 });
        if(!clientProfile) return res.status(404).json(new BadRequest("User does not exist"));

        res.setHeader("Content-Type", "application/json");
        return res.send(
            JSON.stringify(
                {
                    id: clientUser.id,
                    createdAt: new Date(Number(clientUser.createdAt)),
                    user: clientProfile,
                },
                null,
                3
            )
        );
    }

    return res.status(400).json(new BadRequest("Missing Parameters"))

}