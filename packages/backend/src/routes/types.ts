import { RequestHandler } from "express";

import { KokuServer } from "../KokuServer";

/**
 * Request handler type. Please use everywhere so TypeScript knows you can
 * access the server object!
 */
export type RH = (server: KokuServer) => RequestHandler;
