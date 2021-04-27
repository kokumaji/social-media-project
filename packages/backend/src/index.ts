import LocaleFile from "@koku-app/lib_backend/src/locale/Locale";
import dotenv from "dotenv";

import { KokuServer } from "./KokuServer";

console.log(`\nkoku-backend-api - NODE_ENV=${process.env.NODE_ENV}`);
console.log("made with 💜 by skye\n");

// load environment variables from .env
// might need to specify path to point to the workspace root
dotenv.config();

const server = new KokuServer({
	mongoDB: process.env.DATABASE_URI || "",
	server_port: Number(process.env.PORT) || 3000,
	authSecret: process.env.AUTH_SECRET as string,
});

console.log(server.locale.getLocale('test-string'));

server.logger.level = "debug";
server.start();
