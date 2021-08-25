import { connect } from "mongoose";
import morgan from "morgan";
import { registerRoutes } from "./routes";
import { errorHandler } from "./api/exceptions/ExceptionHandler";

import { BackendServer, ServerConfiguration } from "@koku-app/lib_backend";

/**
 * Represents a backend server instance.
 */
export class KokuServer extends BackendServer {

	constructor(options: ServerConfiguration) {
		super(options);

		this.app.use(
			morgan("dev", { stream: { write: (msg) => this.logger.http(msg) } })
		);
	}

	/**
	 * Start the API server.
	 */
	async start() {
		// connect to mongoose
		this.logger.verbose("Connecting to MongoDB...");
		await connect(this.options.mongoDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}).catch((err: Error) => {
			this.logger.error(`Failed to connect to MongoDB: ${err.message}`);
			process.exit();
		});

		this.logger.verbose("Registering routes...");
		registerRoutes(this);

		// JSON Error Handler
		this.app.use(errorHandler);

		this.app.listen(this.options.server_port, "localhost");

		this.logger.info(`Listening on port ${this.options.server_port}`);
	}
}
