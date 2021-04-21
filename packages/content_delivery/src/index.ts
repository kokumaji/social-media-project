import dotenv from "dotenv";
import { DeliveryServer } from "./DeliveryServer";

console.log(`\nKokuMedia CDN - NODE_ENV=${process.env.NODE_ENV}`);

dotenv.config();

const cdnServer = new DeliveryServer({
    database: process.env.MONGO_DB as string,
    port: Number(process.env.CDN_PORT)
});

cdnServer.logger.level = "debug";
cdnServer.start();