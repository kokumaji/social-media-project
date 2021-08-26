import { Status } from "../../models/User";

interface IUserResponse {
	user_id: number;
	user_id_str?: string | null;
	name?: string | null;
	user_name?: string | null;
	location?: string | null;
	description?: string | null;
	url?: string | null;
	created_at?: Date;

	/*
		follower_count // number
		following_count // number
		created_at // timestamp

		liked_posts // number
		posts_count // number
	*/
}

interface PostModel {
	id: number;
	user_id: string;
	content: string;
}

interface IUserPosts {
	posts_count: number;
	data?: PostModel[] | null;
}

const userDefault: IUserResponse = {
	user_id: 0,
	user_id_str: null,
	name: null,
	user_name: null,
	created_at: new Date(0),

	/*
		follower_count // number
		following_count // number
		created_at // timestamp

		liked_posts // number
		posts_count // number
	*/
};

const postsDefault: IUserPosts = {
	posts_count: 0,
	data: null,
	/*
		follower_count // number
		following_count // number
		created_at // timestamp

		liked_posts // number
		posts_count // number
	*/
};

interface IUserMeta {
	birthday?: Date;
	gender?: string | null;
	location?: string | null;
	description?: string | null;
	status?: Status;
}

const metaDefault: IUserMeta = {
	birthday: new Date(0),
	gender: null,
	location: null,
	description: null,
	status: Status.OFFLINE,
};

export default class UserResponse {
	private data: IUserResponse;
	private posts?: IUserPosts;
	private meta?: IUserMeta;

	constructor(
		userResponse: IUserResponse,
		userPosts?: IUserPosts | null,
		userMeta?: IUserMeta | null
	) {
		this.data = { ...userDefault, ...userResponse };
		if (userPosts) this.posts = postsDefault;
		if (userMeta) this.meta = { ...metaDefault, ...userMeta };
	}

	get() {
		return this.data;
	}
}
