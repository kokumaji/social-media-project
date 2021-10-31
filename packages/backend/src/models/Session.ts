import { Document, model, Schema } from "mongoose";

interface SessionDocument extends Document {
	createdAt: number;

	sessionToken: string;
	sessionAddress: string;
}

const SessionSchema = new Schema<SessionDocument>({
	id: String,
	createdAt: { type: Number, default: Date.now },
	sessionToken: String,
	sessionAddress: String,
});

export const Session = model<SessionDocument>("Session", SessionSchema);
