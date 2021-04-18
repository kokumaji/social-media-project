import { ClientUser } from "../../models/ClientUser";
import { Post } from "../../models/Post";
import { User } from "../../models/User";
import * as IdGen from "../../api/objects/Snowflake";
import { RH } from "../types";

interface PostJSON {
	userid: string;
	content: string;
}

export const createPost: RH = (server) => async (req, res) => {
	let json: PostJSON = req.body;

	console.log(json.userid);
	console.log(json.content);

	if (!json.content) {
		return res.status(400).json({ msg: "Bad Request, Missing Content" });
	} else {
		var clientObj;
		clientObj = await ClientUser.findOne({ id: json.userid });
		if (!clientObj)
			return res.status(400).json({ msg: "Bad Request, Invalid User ID" });

		const postObj = new Post({
			postId: IdGen.generate(),
			createdAt: Date.now(),
			author: {
				userId: clientObj.id,
				username: clientObj.username,
			},
			meta: {
				message: json.content,
				favoritesCount: 0,
			},
		});

		postObj.save();
		return res.status(200).json({ status: "Success!" });
	}
};
