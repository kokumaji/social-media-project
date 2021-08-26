import { NextFunction, Request, Response } from "express";
import HttpException from "./HttpException";

export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
	if (error instanceof SyntaxError) {
		return response.status(error.status).json({
			status: error.status,
			message: "Bad Request; Malformed JSON Body!",
		});
	}
	return response.status(error.status).json({ msg: error.message });
};
