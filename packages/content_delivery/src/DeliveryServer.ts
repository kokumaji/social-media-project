import cors from "cors";
import express from "express";
import { registerRoutes } from "./routes";

import { BackendServer, ServerConfiguration } from "@koku-app/lib_backend";

export class DeliveryServer extends BackendServer {

    app = express();

    constructor(readonly options: ServerConfiguration) {
		super(options);

        this.app.use(cors());
        this.app.use(express.json());
        this.app.set('json spaces', 2);
        /* ADD MONGODB WHEN NEEDED
        this.app.use(
			morgan("dev", { stream: { write: (msg) => this.logger.http(msg) } })
		);*/
    }

    async start() {
        this.logger.info(`Registering Routes...`);
        registerRoutes(this);

		this.app.listen(this.options.server_port, "localhost");
		this.logger.info(`Listening on port ${this.options.server_port}`);
    }

}