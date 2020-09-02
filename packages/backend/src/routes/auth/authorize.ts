import bcrypt from "bcrypt";
import { Router } from "express";

import { ClientUser } from "../../models/ClientUser";
import { RH } from "../types";

export const authorize: RH = (server) => async (req, res) => {
    // more secure to use body
    if (!req.body) {
        return res.status(400).json({ msg: "Bad Request" });
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
        return res.status(400).json({ msg: "Bad Request" });
    }

    const isValid = bcrypt.compareSync(password, clientUser.password);

    if (!isValid) {
        return res.json({loginSuccess: false});
    } 

    return res.json({loginSuccess: true});
};
