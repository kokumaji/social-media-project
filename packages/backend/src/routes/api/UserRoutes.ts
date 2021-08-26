import { Request, Response, NextFunction } from "express";
import { BadRequest, NotFound, RequestDenied } from "../../api/exceptions/Exceptions";
import { ClientUser } from "../../models/ClientUser";
import * as User from "../../models/User";
import { RH } from "../types";

export const handleRequest: RH = server => async (req: Request, res: Response, next: NextFunction) => {
	if (req.query) {
		const id = req.query.id;
		console.log(id);
		if (!id) return res.status(400).json(new BadRequest("Missing Parameters"));

		var withMeta = false;
		if (req.query.with_meta) withMeta = true;

		var withPosts = false;
		if (req.query.with_posts) withPosts = true;

		const requestedUser = await User.fromID(id as string, {
			with_meta: withMeta,
			with_posts: withPosts,
		});

		if (!requestedUser) return res.status(404).json(new NotFound("Requested User does not exist"));

		return res.status(200).json(requestedUser);
	}

	return res.status(400).json(new BadRequest("Missing Parameters"));
};
