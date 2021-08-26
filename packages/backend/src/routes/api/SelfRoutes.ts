import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { BadRequest, NotFound } from "../../api/exceptions/Exceptions";
import * as User from "../../models/User";
import { RH } from "../types";

interface TokenPayload {
	iat: number;
	id: string;
}

export const handleRequest: RH = (server) => async (
	req: Request,
	res: Response
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (token) {
		const payload: TokenPayload = jwt.verify(
			token,
			server.options.authSecret as string
		) as TokenPayload;

		const requestedUser = await User.fromID(payload.id, {
			with_meta: true,
			with_posts: false,
		});
		if (!requestedUser)
			return res
				.status(404)
				.json(new NotFound("Requested User does not exist"));

		return res.status(200).json(requestedUser);
	}

	return res.status(400).json(new BadRequest("Missing Parameters"));
};
