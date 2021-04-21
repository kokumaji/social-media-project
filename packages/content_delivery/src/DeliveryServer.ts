import chalk from "chalk";
import cors from "cors";
import { createLogger, format, transports } from "winston";
import express from "express";
import { registerRoutes } from "./routes";

// logging imports
const { printf, combine, label, timestamp, colorize, simple } = format;

const fmt = printf(({ level, message, label, timestamp }) => {
	return `${chalk.gray(timestamp)} ${label.toLowerCase()}:${level} ${chalk.gray(
		"→"
	)} ${message}`;
});

interface DeliveryServerSettings {
    database: string;
    port: number;
}

export class DeliveryServer {

    app = express();

	logger = createLogger({
		transports: [new transports.Console()],
		format: combine(
			label({ label: "cdn" }),
			timestamp(),
			colorize(),
			simple(),
			fmt
		),
	});

    constructor(readonly options: DeliveryServerSettings) {
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

		this.app.listen(this.options.port, "localhost");
		this.logger.info(`Listening on port ${this.options.port}`);
    }

}