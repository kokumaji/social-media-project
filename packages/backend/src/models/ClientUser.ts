import { Document, model, Schema } from "mongoose";

interface ClientUserDocument extends Document {
	id: string;
	email: string;
	createdAt: number;
	password: string;
	username: string;
	clientToken: string;
}

const ClientUserSchema = new Schema<ClientUserDocument>({
	id: String,
	email: String,
	createdAt: { type: Number, default: Date.now },
	password: String,
	username: String,
	clientToken: String,
});

export const ClientUser = model<ClientUserDocument>(
	"ClientUser",
	ClientUserSchema
);