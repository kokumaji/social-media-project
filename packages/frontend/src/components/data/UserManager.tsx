import * as React from "react";
import { getApiToken } from "../../api/CookieHelper";

import * as users from "../../api/users";
import { UserModel } from "./UserModel";

interface UserState {
	id: string;
	authed: boolean;
}

export type UserStateProvider = UserState & {
	authenticate(username: string, password: string): Promise<boolean>;
	register(username: string, email: string, password: string): Promise<boolean>;
};

const checkCookie = () => {
	const cookie = getApiToken(document.cookie);

	return cookie ? true : false;
};

export const UserContext = React.createContext<UserStateProvider>({
	authed: checkCookie(),
	id: "",
	authenticate: async () => false,
	register: async () => false,
});

interface UserDataProvider {
	user: UserModel | null;
}

export const UserData = React.createContext<UserDataProvider>({
	user: null,
});

/**
 * Manages current user state.
 */
export class UserManager extends React.Component<{}, UserState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			id: "",
			authed: checkCookie(),
		};
	}

	/**
	 * Post a auth challege request to the API.
	 */
	async authenticate(username: string, password: string): Promise<boolean> {
		try {
			const { data } = await users.authenticate(username, password);

			if (!data.loginSuccess) {
				return false;
			}

			// Update state.
			this.setState({ authed: true, id: data.id });
			console.log(data);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	/**
	 * Register a user with the API.
	 */
	async register(
		username: string,
		email: string,
		password: string
	): Promise<boolean> {
		try {
			const { data } = await users.register(username, email, password);
			// Update state.
			this.setState({ authed: true, id: data.id });
			console.log(data);
			return true;
		} catch (e) {
			console.error(e);
			return false;
		}
	}

	render() {
		return (
			<UserContext.Provider
				value={{
					...this.state,
					authenticate: this.authenticate.bind(this),
					register: this.register.bind(this),
				}}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}
