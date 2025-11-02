import "newrelic";
import express from "express";
import { apiReference } from "@scalar/express-api-reference";
import fs from "node:fs";
import path from "node:path";
import config from "@config/config";
import { logger } from "@logger/logger";
import Database from "@database/database";
import { globalErrorHandler } from "@errs/http";
import router from "@routes/index";

const app = express();
const openApiSpecPath = path.join(__dirname, "..", "openapi.json");
const OpenApiSpecification = JSON.parse(
	fs.readFileSync(openApiSpecPath, "utf-8"),
);

app.use("/api", router);
app.use(
	"/reference",
	apiReference({
		spec: {
			content: OpenApiSpecification,
		},
	}),
);
app.use(globalErrorHandler);

async function startServer() {
	try {
		const sequelize = Database.getInstance();
		await sequelize.authenticate();
		await sequelize.sync();
		await sequelize.sync({ alter: true });

		const server = app.listen(config.SERVER_PORT, () => {
			logger.info(
				`Server is running on http://${config.HOST_NAME}:${config.SERVER_PORT}`,
			);
			logger.info(
				`API Reference: http://${config.HOST_NAME}:${config.SERVER_PORT}/reference`,
			);
		});

		process.on("SIGINT", async () => {
			logger.info("Received SIGINT, starting graceful shutdown...");

			server.close(async () => {
				logger.info("Closed out remaining connections.");

				await sequelize.close();
				logger.info("Database connection closed.");
				process.exit(0);
			});

			setTimeout(() => {
				logger.error("Forced shutdown due to timeout.");
				process.exit(1);
			}, 10000);
		});

		process.on("SIGTERM", async () => {
			logger.info("Received SIGTERM, starting graceful shutdown...");

			server.close(async () => {
				logger.info("Closed out remaining connections.");
				await sequelize.close();
				logger.info("Database connection closed.");
				process.exit(0);
			});

			setTimeout(() => {
				logger.error("Forced shutdown due to timeout.");
				process.exit(1);
			}, 10000);
		});
	} catch (error) {
		logger.error("Unable to connect to the database:", error);
		process.exit(1);
	}
}

startServer();
