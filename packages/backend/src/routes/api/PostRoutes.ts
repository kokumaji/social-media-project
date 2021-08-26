import { Request, Response } from "express";
import { BadRequest } from "../../api/exceptions/Exceptions";
import { ClientUser } from "../../models/ClientUser";
import { Post } from "../../models/Post";

import * as IdGen from "../../api/objects/Snowflake";
import { RH } from "../types";

interface PostJSON {
	id: string;
	content: string;
}

export const createPost: RH = () => async (req: Request, res: Response) => {
	if (!req.body)
		return res.status(400).json(new BadRequest("Missing Parameters"));
	const postJson = req.body as PostJSON;

	if (!postJson.content) {
		return res.status(400).json({ msg: "Bad Request, Missing Content" });
	} else {
		const clientObj = await ClientUser.findOne({ id: postJson.id });
		if (!clientObj)
			return res.status(400).json({ msg: "Bad Request, Invalid User ID" });

		const postObj = new Post({
			postId: IdGen.generate(),
			createdAt: Date.now(),
			author: {
				userId: clientObj.id,
				username: clientObj.credentials.username,
			},
			meta: {
				message: postJson.content,
				favoritesCount: 0,
			},
		});

		await postObj.save();
		return res.status(200).json({ status: "Success!" });
	}
};

export const getPosts: RH = () => async (req: Request, res: Response) => {
	if (req.query) {
		const userId = req.query.id;
		if (!userId)
			return res.status(400).json(new BadRequest("Missing Parameters"));

		const olderThan =
			req.query.before && !isNaN(Number(req.query.before))
				? Number(req.query.before)
				: Date.now();
		const postLimit =
			req.query.limit && !isNaN(Number(req.query.limit))
				? Math.min(10, Number(req.query.limit))
				: 10;

		const author = await ClientUser.findOne({ id: req.query.id as string });
		if (!author)
			return res.status(400).json(new BadRequest("User does not exist"));

		const posts = await Post.find({
			author: { userId: author.id, username: author.credentials.username },
			createdAt: { $lt: olderThan },
		}).limit(postLimit);
		return res.status(200).json(posts);
	}

	return res.status(400).json(new BadRequest("Missing Parameters"));
};
