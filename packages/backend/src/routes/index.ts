import { KokuServer } from "../KokuServer";
import { authorize } from "./auth/authorize";
import { register } from "./auth/register";

import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { RH } from "./types";
import { NotFound, RequestDenied, UnauthorizedError } from "../api/exceptions/Exceptions";
import cors from "cors";
import * as UserRoutes from "./api/UserRoutes";
import * as SelfRoutes from "./api/SelfRoutes";
import { fromID, User } from "../models/User";
import { ClientUser } from "../models/ClientUser";
import { createPost, getPosts } from "./api/PostRoutes";

const corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export const registerRoutes = (server: KokuServer) => {
	const app = server.app;

	app.post("/authorize", cors(corsOptions), authorize(server));
	app.post("/v1/posts/create", checkHeader(HttpHeader.AUTHORIZATION, HeaderType.BASIC), authenticateSecret(server), createPost(server));
	app.get("/v1/posts", checkHeader(HttpHeader.AUTHORIZATION, HeaderType.BASIC), authenticateSecret(server), getPosts(server));
	app.post("/register", register(server));

	// app.get('/api/users', function(req, res) {
	//     // res.header('Access-Control-Allow-Origin', '*');
	//     const user = mongoose.connection.model('User', User, 'userProfiles');
	//     user.find({}).then(collection => {
	//         res.json(collection);
	//     });
	// });

    app.get("/v1/user", cors(corsOptions), UserRoutes.handleRequest(server));
    app.get("/v1/user/:id/:param", cors(corsOptions), authenticateSecret(server), UserRoutes.handleRequest(server));
    app.post("/@me/:param", authenticateJWT(server), SelfRoutes.handleRequest(server));

};

const enum HttpHeader {
	CONNECTION = "Connection",
	AUTHORIZATION = "Authorization",
	COOKIE = "Set-Cookie"
}

const enum HeaderType {
	BASIC = "Basic",
	BEARER = "Bearer"
}

const checkHeader = (header: HttpHeader, type: HeaderType) => (req: Request, res: Response, next: NextFunction) => {
	var validHeader = false;
	var validType = false;

	var headerContent; 

	switch(header) {
		case HttpHeader.AUTHORIZATION:
			validHeader = req.headers.authorization ? true : false;
			headerContent = req.headers.authorization;
			break;
		case HttpHeader.CONNECTION:
			validHeader = req.headers.connection ? true : false;
			headerContent = req.headers.connection;
			break;
		case HttpHeader.COOKIE:
			validHeader = req.headers.cookie ? true : false;
			headerContent = req.headers.cookie;
			break;
	}

	if(!headerContent || !validHeader) {
		return res.status(401).json(new UnauthorizedError("Invalid Header Content"));
	}

	const headerArguments = headerContent.split(" ");

	if(headerArguments.length != 2) return res.status(401).json(new UnauthorizedError("Invalid Header Length"));

	console.log(headerArguments[0] == HeaderType.BASIC);

	switch(type) {
		case HeaderType.BASIC:
			validType = headerArguments[0] === HeaderType.BASIC ? true : false;
			break;
		case HeaderType.BEARER:
			validType = headerArguments[0] === HeaderType.BEARER ? true : false;
			break;
	}

	if(!validType) return res.status(401).json(new UnauthorizedError("Invalid Header Type"));
	next();

}

const authenticateSecret: RH = (server) => async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	if(authHeader) {
		var token = authHeader.split(" ")[1];

		if(token.startsWith("clientToken:")) {
			token = token.replace("clientToken:", "");

			const user = await ClientUser.findOne( { clientToken: token } );
			if(!user) return res.status(401).json(new UnauthorizedError("Invalid Client Secret"));

			next();

		} else {
			return res.status(401).json(new UnauthorizedError("Invalid Header"));
		}

	} else {
		return res.status(401).json(new UnauthorizedError("Missing Client Secret"));
	}
}

interface AuthToken {
	iat: number,
	id: string
}

const authenticateJWT: RH = (server) => async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(" ")[1];

		jwt.verify(token, server.options.authSecret as string, async (err, payload) => {
			if (!payload || err) return res.status(403).json(new RequestDenied("Invalid Bearer Token"));
			const tokenContent = payload as AuthToken;

			if(!tokenContent.id) return res.status(403).json(new RequestDenied("Invalid Bearer Token"));

			const clientUser = await fromID(tokenContent.id);
			if(!clientUser) return res.status(403).json(new RequestDenied("Invalid Bearer Token"));

			next();
		});
	} else {
		return res.status(401).json(new UnauthorizedError("No Bearer Token provided"));
	}
};

const authenticateCookie: RH = (server) => (req: Request, res: Response, next: NextFunction) => {
	const cookie = req.body.token;

	if (cookie) {
		const token = cookie as string;

		jwt.verify(token, server.options.authSecret as string, (err, payload) => {
			if (!payload || err) return res.status(403).json(new RequestDenied("Invalid Bearer Token"));
			next();
		});
	} else {
		return res.status(401).json(new UnauthorizedError("No Bearer Token provided"));
	}
};