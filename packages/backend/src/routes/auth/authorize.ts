import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { BadRequest, NotFound } from "../../api/exceptions/Exceptions";

import { ClientUser } from "../../models/ClientUser";
import { Session } from "../../models/Session";
import { RH } from "../types";

interface AuthData {
	username: string;
	password: string;
}

export const authorize: RH = (server) => async (req, res) => {
	if (!req.body) {
		return res.status(400).json(new BadRequest("Empty or Invalid Body"));
	}

	const authData = req.body as AuthData;
	if(!authData.username || !authData.password) {
		return res.status(400).json(new BadRequest("Missing Parameters"));
	}
	
	const clientUser = await ClientUser.findOne({ username: authData.username });
	
	let isValid = false;
	if(clientUser) {
		isValid = bcrypt.compareSync(authData.password, clientUser.credentials.password);
	}

	if (!clientUser || !isValid) {	
		return res.status(400).json(new NotFound("Invalid Credentials"));
	}
	
	const existingSessions = await Session.find({ id: clientUser.id });

	for(const sess of existingSessions) {
		const isAddress = await bcrypt.compare(req.socket.remoteAddress, sess.sessionAddress);
		if(isAddress) {
			return res.cookie("apiToken", sess.sessionToken, { maxAge: 3600000, sameSite: "lax" })
			.json({ loginSuccess: true });
		}
	}

	const sessionAddress = await bcrypt.hash(req.socket.remoteAddress, 10);
	const accessToken = jwt.sign({ id: clientUser.id, sessionAddress: sessionAddress }, server.options.authSecret as string);

	const session = new Session({
		id: clientUser.id,
		sessionAddress: sessionAddress,
		sessionToken: accessToken
	});

	await session.save();

	return res
		.cookie("apiToken", session.sessionToken, { maxAge: 3600000, sameSite: "lax" })
		.json({ loginSuccess: true });
};
