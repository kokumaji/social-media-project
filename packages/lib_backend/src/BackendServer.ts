import chalk from "chalk";
import cors from "cors";
import express from "express";
import { createLogger, format, transports } from "winston";
import LocaleFile from "./locale/Locale";

// logging imports
const { printf, combine, label, timestamp, colorize, simple } = format;

const fmt = printf(({ level, message, label, timestamp }) => {
	return `${chalk.gray(timestamp)} ${label.toLowerCase()}:${level} ${chalk.gray("→")} ${message}`;
});

export interface ServerConfiguration {
	/**
	 * Preformatted MongoDB url
	 */
	mongoDB: string;

	/**
	 * Server Port
	 */
	server_port: number;

	/**
	 * Used for JWT encryption
	 */
	authSecret?: string;

	/**
	 * Server's Identification String (used for logging atm)
	 */
	name: string;
}

export abstract class BackendServer {
	app = express();
	locale = new LocaleFile();
	options;
	logger;

	constructor(readonly config: ServerConfiguration) {
		this.options = config;
		this.app.use(cors());
		this.app.use(express.json());
		this.app.set("json spaces", 2);

		this.logger = createLogger({
			transports: [new transports.Console()],
			format: combine(label({ label: this.config.name }), timestamp(), colorize(), simple(), fmt),
		});

		/* ADD MONGODB WHEN NEEDED
        this.app.use(
			morgan("dev", { stream: { write: (msg) => this.logger.http(msg) } })
		);*/
	}

	abstract start(): void;
}
