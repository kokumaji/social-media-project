import axios from "axios";
import { getApiToken } from "./CookieHelper";

export const getUser = async (id: string) => {
	let url = `http://localhost:3000/api/api/user?id=${id}`;
	if (isNaN(Number(id))) url = `http://localhost:3000/api/api/user?name=${id}`;

	return await axios.get(url).then(async (response) => {
		return response.data;
	});
};

export const getSelf = async (token: string) => {
	token = token.replace("apiToken=", "");

	return await axios.post("http://localhost:3000/api/api/@me/debug", {  }, { headers: {
		'Authorization' : `Bearer ${getApiToken(document.cookie)}`
	} })
	.then(async (response) => {
		return response.data;
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
