import dotenv from "dotenv";

import { KokuServer } from "./KokuServer";

console.log(`\nkoku-backend-api - NODE_ENV=${process.env.NODE_ENV}`);
console.log("made with 💜 by skye\n");

dotenv.config();

const server = new KokuServer({
	mongoDB: process.env.DATABASE_URI || "",
	server_port: Number(process.env.PORT) || 8080,
	authSecret: process.env.AUTH_SECRET,
	name: "backend"
});

server.logger.level = "debug";
void server.start();
