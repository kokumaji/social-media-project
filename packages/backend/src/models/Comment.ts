import { Document, model, Schema } from "mongoose";

interface CommentDocument extends Document {
	commentId: String;
	author: {
		userId: String;
		username: String;
	};
	meta: {
		message: String;
		likes: Number;
	};
}

const CommentSchema = new Schema<CommentDocument>({
	commentId: String,
	author: {
		userId: String,
		username: String,
	},
	meta: {
		message: String,
		likes: Number,
	},
});

export const Comment = model<CommentDocument>(
	"Comment",
	CommentSchema,
	"postcomments"
);
