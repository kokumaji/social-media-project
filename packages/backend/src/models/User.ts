import { Document, model, Schema } from "mongoose";

interface UserDocument extends Document {
	username: string;
	fullname: string;
	age: number;
	location: string;
	gender: string;
	profile: {
		imageUrl: string;
		description: string;
		bannerUrl: string;
		cardScheme: string;
	};
}

const UserSchema = new Schema<UserDocument>({
	username: String,
	fullname: String,
	age: Number,
	location: String,
	gender: String,
	profile: {
		imageUrl: String,
		description: String,
		bannerUrl: String,
		cardScheme: String,
	},
});

export const User = model<UserDocument>("User", UserSchema, "clientprofiles");
