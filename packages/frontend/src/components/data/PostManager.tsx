import axios from "axios";
import React from "react";
import { getApiToken } from "../../api/CookieHelper";
import { PostModel } from "./PostModel";

interface PostState {
	userId: string;
	content: string;
	authed: boolean;
}

export type PostStateProvider = PostState & {
	submitPost(userId: string, content: string): Promise<boolean>;
};

const checkCookie = () => {
	const cookie = getApiToken(document.cookie);
	return cookie ? true : false;
};

export const PostContext = React.createContext<PostStateProvider>({
	authed: checkCookie(),
	content: "",
	userId: "",
	submitPost: async () => false,
});

interface PostDataProvider {
	post: PostModel | null;
}

export const PostData = React.createContext<PostDataProvider>({
	post: null,
});

export class PostManager extends React.Component<{}, PostState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			userId: "",
			content: "",
			authed: checkCookie(),
		};
	}

	async submitPost(userId: string, content: string): Promise<boolean> {
		const data = { id: userId, content: content };
		void axios
			.create({ baseURL: "http://localhost:3000/api", withCredentials: true })
			.post("http://localhost:3000/api/v1/posts/create", data, {
				headers: {
					Authorization: `Bearer ${getApiToken(document.cookie)}`,
				},
			});

		return true;
	}

	render() {
		return (
			<PostContext.Provider
				value={{
					...this.state,
					submitPost: this.submitPost.bind(this),
				}}
			>
				{this.props.children}
			</PostContext.Provider>
		);
	}
}
