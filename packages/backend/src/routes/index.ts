import { KokuServer } from "../KokuServer";
import { authorize } from "./auth/authorize";
import { getUser, getUsers, validateToken } from "./public/user";
import { register } from "./auth/register";
import { createPost } from "./auth/createpost";

import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { RH } from "./types";
import { RequestDenied, UnauthorizedError } from "../api/exceptions/Exceptions";
import cors from "cors";

const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const registerRoutes = (server: KokuServer) => {
	const app = server.app;

	app.post("/authorize", cors(corsOptions), authorize(server));
	app.post("/createpost", authenticateJWT(server), createPost(server));
	app.post("/register", register(server));

	// app.get('/api/users', function(req, res) {
	//     // res.header('Access-Control-Allow-Origin', '*');
	//     const user = mongoose.connection.model('User', User, 'userProfiles');
	//     user.find({}).then(collection => {
	//         res.json(collection);
	//     });
	// });

	app.get("/api/user", getUser(server));
	app.get("/api/users", getUsers(server));
};

interface JsonPayload {
	id: string;
	iat: number;
}

const authenticateJWT: RH = (server) => (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		jwt.verify(token, server.options.authSecret, (err, payload) => {
			if (!payload || err)
				return res.status(403).json(new RequestDenied("Invalid Bearer Token"));

			const jsonPayload = payload as JsonPayload;

			if (jsonPayload.id != req.body.userid)
				return res.status(403).json(new RequestDenied("Invalid Bearer Token"));

			next();
		});
	} else {
		return res
			.status(401)
			.json(new UnauthorizedError("No Bearer Token provided"));
	}
};
