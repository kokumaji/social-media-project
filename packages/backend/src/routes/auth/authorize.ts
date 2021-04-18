import bcrypt from "bcrypt";
import { Router } from "express";
import * as jwt from "jsonwebtoken";

import { ClientUser } from "../../models/ClientUser";
import { RH } from "../types";

export const authorize: RH = (server) => async (req, res) => {
    // more secure to use body
    if (!req.body) {
        return res.status(400).json({ msg: `Bad Request, req.body is ${req.body}` });
    }

    const { username, password } = req.body;
/* 
    if (!username || !password) {
        return res.status(400).json({ msg: "Bad Request" });
    }
 */
    server.logger.verbose(`Attempting to authorize user - username='${username}'`);
    const clientUser = await ClientUser.findOne({ username });

    if(!clientUser) {
        return res.status(400).json({ msg: "Bad Request, ClientUser does not exist" });
    }

    const isValid = bcrypt.compareSync(password, clientUser.password);

    if (!isValid) {
        return res.json({loginSuccess: false});
    } 

    const accessToken = jwt.sign({ id: clientUser.id }, server.options.authSecret );
    return res.cookie('apiToken', accessToken, { maxAge: 3600000, sameSite: 'lax' }).json({loginSuccess: true});
};
