import dotenv from "dotenv";

import { KokuServer } from "./KokuServer";

console.log(`\nkoku-backend-api - NODE_ENV=${process.env.NODE_ENV}`);
console.log("made with 💜 by skye\n");

// load environment variables from .env
// might need to specify path to point to the workspace root
dotenv.config();

const server = new KokuServer({
    databaseUri: process.env.DATABASE_URI || "",
    port: Number(process.env.PORT) || 3000,
});

server.logger.level = "debug";
server.start();