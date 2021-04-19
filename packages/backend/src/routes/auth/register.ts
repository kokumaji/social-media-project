import bcrypt from "bcrypt";
import { Router } from "express";
import * as jwt from "jsonwebtoken";

import * as IdGen from "../../api/objects/Snowflake";
import { ClientUser } from "../../models/ClientUser";
import { RH } from "../types";

import { RequestDenied } from "../../api/exceptions/Exceptions";
import { User } from "../../models/User";

export const register: RH = (server) => async (req, res) => {
	// We strictly want to work with JSON requests, so let's block urlencoded entirely
	if (req.is("application/x-www-form-urlencoded"))
		return res
			.status(403)
			.json(new RequestDenied("This Request is not allowed here."));

	const jsonBody = req.body;

	if (!req.body) {
		return res.status(400).json({ msg: "Bad Request, Missing Parameters" });
	}

	const username = req.param("username");
	const email = req.param("email");
	const password = req.param("password");

	console.log(`${username} ${email} ${password}`);

	if (!username || !password) {
		return res
			.status(400)
			.json({ msg: "Bad Request, Missing username or password" });
	}

	const hashed = await bcrypt.hash(password, 10);
	server.logger.verbose(
		`Attempting to register user - username='${username}' hash=${hashed}`
	);

	// If user already exists
	if (await ClientUser.exists({ username })) {
		return res.status(400).json({ msg: "Bad Request, user exists" });
	}

	const clientUser = new ClientUser({
		username,
		email,
		password: hashed,
		id: IdGen.generate(),
	});

	/*
	const clientProfile = new User({
		username,
		fullname: username.toUpperCase(),
		age: 19,
		location: whatTheySelected,
		gender: whatTheySelected,
		profile: {
			imageUrl: "null",
			description: "null",
			bannerUrl: "null",
			cardScheme: "SummerSunset"
		}
	});
	
	await clientProfile.save();*/

	await clientUser.save();


	const token = jwt.sign({ id: clientUser.id }, server.options.authSecret);
	return res.status(200).send({ auth: true, token: token });
};
