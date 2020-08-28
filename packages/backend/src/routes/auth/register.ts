import bcrypt from "bcrypt";
import { Router } from "express";
import * as IdGen from '../../api/objects/Snowflake';

import { ClientUser } from "../../models/ClientUser";
import { RH } from "../types";

export const register: RH = (server) => async (req, res) => {
    // more secure to use body
    if (!req.body) {
        return res.status(400).json({ msg: "Bad Request" });
    }

    const { username, email, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: "Bad Request" });
    }

    const hashed = await bcrypt.hash(password, 10);
    server.logger.verbose(`Attempting to register user - username='${username}' hash=${hashed}`);

    // If user already exists
    if (await ClientUser.exists({ username })) {
        return res.status(400).json({ msg: "Bad Request" });
    }

    const clientUser = new ClientUser({ username, email, password: hashed, id: IdGen.generate()})
    await clientUser.save();

    return res.json(true);
};
