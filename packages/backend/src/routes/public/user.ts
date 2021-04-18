import { ClientUser } from "../../models/ClientUser";
import { User } from "../../models/User";
import { RH } from "../types";
import { withinRange } from "../../api/Math";

import * as jwt from "jsonwebtoken";

export const getUser: RH = (server) => async (req, res) => {
	console.log(`${req.query.id}`);
	if (!req.query.id) return res.status(400).json({ msg: "Bad Request" });

	const userId = (req.query.id as string) || "";

	let clientUser;
	clientUser = await ClientUser.findOne({ id: userId });

	if (!clientUser) {
		return res
			.status(400)
			.json({ msg: `Bad Request, no user with id ${userId}` });
	}

	const clientProfile = await User.findOne(
		{ username: clientUser.username },
		{ _id: 0 }
	);
	if (!clientProfile) {
		return res
			.status(400)
			.json({ msg: `Bad Request, no profile for id ${userId}` });
	}

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
};

export const getUsers: RH = (server) => async (req, res) => {
	if (req.query.limit && isNaN(Number(req.query.limit)))
		return res.status(400).json({ msg: "Bad Request" });
	const limitRequest =
		req.query.limit && withinRange(Number(req.query.limit), 0, 10)
			? req.query.limit
			: 10;

	const clientList = await User.find({}, { _id: 0 }).limit(
		Number(limitRequest)
	);

	res.setHeader("Content-Type", "application/json");
	return res.send(JSON.stringify(clientList, null, 3));
};

export const validateToken: RH = (server) => async (req, res) => {
	if (!req.query.token) res.status(403).json({ msg: "No token provided." });
	const token = req.query.token as string;

	jwt.verify(token, server.options.authSecret, function (err, decoded) {
		if (err)
			return res
				.status(500)
				.send({ auth: false, message: "Failed to authenticate token." });
		return res.status(200).send(decoded);
	});
};
