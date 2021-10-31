import dotenv from "dotenv";
import { ServerConfiguration } from "../../lib_backend/src";
import { DeliveryServer } from "./DeliveryServer";

console.log(`\nKokuMedia CDN - NODE_ENV=${process.env.NODE_ENV}`);

dotenv.config();

const cdnServer = new DeliveryServer({
	mongoDB: process.env.MONGO_DB,
	server_port: Number(process.env.CDN_PORT),
	name: "cdn",
} as ServerConfiguration);

cdnServer.logger.level = "debug";
void cdnServer.start();
