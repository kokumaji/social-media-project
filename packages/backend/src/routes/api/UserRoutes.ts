import { Request, Response, NextFunction } from "express";
import { BadRequest, NotFound, RequestDenied } from "../../api/exceptions/Exceptions";
import { ClientUser } from "../../models/ClientUser";
import { User } from "../../models/User";
import { RH } from "../types";

export const handleRequest: RH = (server) => async (req: Request, res: Response, next: NextFunction) => {
    if (req.is("application/x-www-form-urlencoded"))
        return res.status(403).json(new RequestDenied("This Request is not allowed here."));

    if (!req.body)
        return res.status(400).json(new BadRequest("Malformed JSON Body"));

    switch(req.params.request as string) {
        case "profile": {
            const clientId = req.body.userid as string;
            const username = req.body.username as string;
            
            if(!clientId && !username) return res.status(400).json(new BadRequest("Malformed JSON Body"));
            
            var clientUser;

            if(clientId) clientUser = await ClientUser.findOne({ id: clientId });
            else if(!clientId && !clientUser) clientUser = await ClientUser.findOne({ username: username });

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
    }
};