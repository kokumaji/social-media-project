import { Document, model, Schema } from "mongoose";
import { UserOptions } from "../api/data/UserOptions";
import UserResponse from "../api/data/UserResponse";
import { ClientUser } from "./ClientUser";

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

export const enum Status {
	ONLINE = "ONLINE",
	OFFLINE = "OFFLINE",
}

export const fromID = async (requestedId: string, options?: UserOptions) => {
	const clientUser = await ClientUser.findOne({ id: requestedId }, { _id: 0 });
	if (!clientUser) return null;

	const clientProfile = await User.findOne({ username: clientUser.username }, { _id: 0 });
	if (!clientProfile) return null;

	const response: UserResponse = new UserResponse(
		{
			user_id: Number(clientUser.id),
			user_id_str: clientUser.id,
			name: clientProfile.fullname,
			user_name: clientUser.username,
			created_at: new Date(clientUser.createdAt),
		},
		options?.with_posts
			? {
					posts_count: 0,
			  }
			: null,
		options?.with_meta
			? {
					gender: clientProfile.gender,
					location: clientProfile.location,
					description: clientProfile.profile.description,
			  }
			: null
	);

	return response;
};
