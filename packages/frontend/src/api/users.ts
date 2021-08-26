import axios from 'axios';

import { getApiToken } from './CookieHelper';
import { User } from './models/user/User';

export const getUser = (id: string) =>
	axios
		.get<User>(`http://localhost:3000/api/v1/user?id=${id}&with_meta=true`)
		.then(response => response.data);

export const getSelf = async () => {
	return await axios
		.get("http://localhost:3000/api/@me/debug", {
			headers: {
				Authorization: `Bearer ${getApiToken(document.cookie)}`
			}
		})
		.then(response => {
			return new User(
				{
					id: response.data.data.user_id,
					name: response.data.data.name,
					user_name: response.data.data.user_name,
					created_at: response.data.data.created_at,
					role: null
				},
				{
					gender: response.data.meta.gender,
					location: response.data.meta.location,
					description: response.data.meta.description,
					status: response.data.meta.status
				}
			);
		});
};

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
		password
	});
