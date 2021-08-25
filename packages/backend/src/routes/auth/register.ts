import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import * as IdGen from "../../api/objects/Snowflake";
import { ClientUser } from "../../models/ClientUser";
import { RH } from "../types";

import * as crypto from "crypto";

import { RequestDenied } from "../../api/exceptions/Exceptions";
import { User } from "../../models/User";
import { getRole } from "../../models/roles/Role";

interface RegisterPayload {
	username: string;
	password: string;
	email: string;
}

export const register: RH = (server) => async (req, res) => {
	// We strictly want to work with JSON requests, so let's block urlencoded entirely
	if (req.is("application/x-www-form-urlencoded"))
		return res
			.status(403)
			.json(new RequestDenied("This Request is not allowed here."));

	const jsonBody = req.body as RegisterPayload;

	if (!req.body) {
		return res.status(400).json({ msg: "Bad Request, Missing Parameters" });
	}

	const username = jsonBody.username;
	const password = jsonBody.password;
	const email = jsonBody.email;

	if (!username || !password) {
		return res
			.status(400)
			.json({ msg: "Bad Request, Missing username or password" });
	}

	const hashed = await bcrypt.hash(password, 10);
	server.logger.verbose(
		`Attempting to register user - username='${username}'`
	);

	// If user already exists
	if (await ClientUser.exists({ username })) {
		return res.status(400).json({ msg: "Bad Request, user exists" });
	}

	const clientUser = new ClientUser({
		username: username,
		credentials: { 
			email, password: hashed
		},
		id: IdGen.userId(),
		role: getRole("regular")
	});

	const clientProfile = new User({
		username,
		fullname: username.toUpperCase(),
		age: 0,
		location: "null",
		gender: "null",
		profile: {
			imageUrl: "null",
			description: "null",
			bannerUrl: "null",
			cardScheme: "SummerSunset"
		}
	});

	await clientProfile.save();
	await clientUser.save();

	server.logger.verbose(
		`Saved user to database`
	);

	const sessionAddress = await bcrypt.hash(req.socket.remoteAddress, 10);
	const token = jwt.sign({ id: clientUser.id, sessionAddress: sessionAddress }, server.options.authSecret as string);
	return res.status(200).send({ auth: true, token: token });
};
