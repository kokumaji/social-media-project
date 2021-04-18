import { Document, model, Schema } from "mongoose";
import { Comment } from "./Comment";

interface PostDocument extends Document {
	postId: string;
	createdAt: number;
	author: {
		userId: string;
		username: string;
	};
	meta: {
		message: string;
		favoritesCount: number;
		comments: number;
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
