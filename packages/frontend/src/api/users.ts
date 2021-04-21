import axios from "axios";
import { getApiToken } from "./CookieHelper";
import UserObject from "./models/user/UserObject";

export const getUser = async (id: string) => {
	let url = `http://localhost:3000/api/v1/user?id=${id}&with_meta=true`;

	return await axios.get(url).then(async (response) => {
		return response.data;
	});
};

export const getSelf = async (token: string) => {
	token = token.replace("apiToken=", "");

	return await axios.post("http://localhost:3000/api/@me/debug", {  }, { headers: {
		'Authorization' : `Bearer ${getApiToken(document.cookie)}`
	} })
	.then(async (response) => {
		return new UserObject({
			id: response.data.data.user_id,
			name: response.data.data.name,
			user_name: response.data.data.user_name,
			created_at: response.data.data.created_at,
		}, {
			gender: response.data.meta.gender,
			location: response.data.meta.location,
			description: response.data.meta.description,
			status: response.data.meta.status,
		})
	});
}

export const getUsers = () => axios.get("http://localhost:3000/api/api/users");

/**
 * Authorize a user with the API.
 */

export const authenticate = (username: string, password: string) =>
	axios
		.create({ baseURL: `http://localhost:3000/api/`, withCredentials: true })
		.post("http://localhost:3000/api/authorize", { username, password });

export const register = (username: string, email: string, password: string) =>
	axios.post("http://localhost:3000/api/register", {
		username,
		email,
		password,
});
