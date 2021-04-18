import bodyParser from "body-parser";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import morgan from "morgan";
import { createLogger, format, transports } from "winston";
import { registerRoutes } from "./routes";
import { errorHandler } from "./api/exceptions/ExceptionHandler";

// logging imports
const { printf, combine, label, timestamp, colorize, simple } = format;

const fmt = printf(({ level, message, label, timestamp }) => {
    return `${chalk.gray(
        timestamp
    )} ${label.toLowerCase()}:${level} ${chalk.gray("→")} ${message}`;
});

// Server settings
interface KokuServerSettings {
    databaseUri: string;
    port: number;
    authSecret: string;
}

/**
 * Represents a backend server instance.
 */
export class KokuServer {
    /**
     * Express app instance.
     */
    app = express();
    
    logger = createLogger({
        transports: [new transports.Console()],
        format: combine(
            label({ label: "koku" }),
            timestamp(),
            colorize(),
            simple(),
            fmt
        ),
    }); 

    constructor(readonly options: KokuServerSettings) {
        // this.connection = createConnection(this.options.databaseUri);
        this.app.use(cors());
        this.app.use(morgan("dev", { stream: { write: (msg) => this.logger.http(msg) } }));
        this.app.use(express.json());
    }

    /**
     * Start the API server.
     */
    async start() {
        // connect to mongoose
        this.logger.verbose("Connecting to MongoDB...");
        await connect(this.options.databaseUri, { useNewUrlParser: true, useUnifiedTopology: true }).catch((err) => {
            console.error(err);
            this.logger.error("Failed to connect to MongoDB");
            process.exit();
        });

        this.logger.verbose("Registering routes...");
        registerRoutes(this);

        // JSON Error Handler 
        this.app.use(errorHandler);

        this.app.listen(this.options.port, 'localhost');
        
        this.logger.info(`Listening on port ${this.options.port}`);
        
    }

}
