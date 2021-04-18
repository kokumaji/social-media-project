import { Document, model, Schema } from "mongoose";

interface ClientUserDocument extends Document {
	id: string;
	email: string;
	createdAt: Number;
	password: string;
	username: string;
}

const ClientUserSchema = new Schema<ClientUserDocument>({
	id: String,
	email: String,
	createdAt: { type: Number, default: Date.now },
	password: String,
	username: String,
});

export const ClientUser = model<ClientUserDocument>(
	"ClientUser",
	ClientUserSchema
);
