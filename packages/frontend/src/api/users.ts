import axios from "axios";

export const getUser = async (id: string) => {
    var url = `http://localhost:8080/api/user?id=${id}`;
    if(isNaN(Number(id))) url = `http://localhost:8080/api/user?name=${id}`;

    return await axios.get(url)
    .then(async (response) => {
        return response.data;
    });

};

export const getUsers = () => axios.get('http://localhost:8080/api/users');

/**
 * Authorize a user with the API.
 */
export const authenticate = (username: string, password: string) => axios.post('http://localhost:8080/authorize', { username, password });

export const register = (username: string, email: string, password: string) => axios.post('http://localhost:8080/register', { username, email, password });
