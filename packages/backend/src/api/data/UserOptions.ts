interface IUserOptions {
	with_posts: boolean;
	with_meta: boolean;
}

export class UserOptions implements IUserOptions {
	with_posts: boolean;
	with_meta: boolean;

	constructor(withPosts?: boolean, withMeta?: boolean) {
		this.with_posts = withPosts ? true : false;
		this.with_meta = withMeta ? true : false;
	}
}
