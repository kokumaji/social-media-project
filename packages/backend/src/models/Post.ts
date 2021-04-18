import { Document, model, Schema } from "mongoose";
import { Comment } from "./Comment";

interface PostDocument extends Document {
	postId: String;
	createdAt: Number;
	author: {
		userId: String;
		username: String;
	};
	meta: {
		message: String;
		favoritesCount: Number;
		comments: Number;
	};
}

const PostSchema = new Schema<PostDocument>({
	postId: String,
	createdAt: { type: Number, default: Date.now },
	author: {
		userId: String,
		username: String,
	},
	meta: {
		message: String,
		favoritesCount: { type: Number, default: 0 },
		comments: { type: Number, default: 0 },
	},
});

export const Post = model<PostDocument>("Post", PostSchema, "clientposts");
