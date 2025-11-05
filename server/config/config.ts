import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const configSchema = z.object({
	PRIMARY_ENV: z.string(),
	HOST_NAME: z.string(),
	SERVER_PORT: z.string().regex(/^\d+$/).transform(Number),
	SERVER_READ_TIMEOUT: z.string().regex(/^\d+$/).transform(Number),
	SERVER_WRITE_TIMEOUT: z.string().regex(/^\d+$/).transform(Number),
	SERVER_IDLE_TIMEOUT: z.string().regex(/^\d+$/).transform(Number),
	SERVER_CORS_ALLOWED_ORIGINS: z.string(),
	DATABASE_HOST: z.string(),
	DATABASE_PORT: z.string().regex(/^\d+$/).transform(Number),
	DATABASE_USER: z.string(),
	DATABASE_PASSWORD: z.string(),
	DATABASE_NAME: z.string(),
	DATABASE_SSL_MODE: z.enum(["disable", "require", "prefer"]),
	DATABASE_MAX_OPEN_CONNS: z.string().regex(/^\d+$/).transform(Number),
	DATABASE_MAX_IDLE_CONNS: z.string().regex(/^\d+$/).transform(Number),
	DATABASE_CONN_MAX_LIFETIME: z.string().regex(/^\d+$/).transform(Number),
	DATABASE_CONN_MAX_IDLE_TIME: z.string().regex(/^\d+$/).transform(Number),
	DATABASE_DIALECT: z.string(),
	AUTH_SECRET_KEY: z.string(),
	INTEGRATION_RESEND_API_KEY: z.string(),
	REDIS_ADDRESS: z.string(),
	REDIS_PASSWORD: z.string().optional(),
	AWS_REGION: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_UPLOAD_BUCKET: z.string(),
	AWS_ENDPOINT_URL: z.string().optional(),
	NEW_RELIC_APP_NAME: z.string(),
	OBSERVABILITY_ENVIRONMENT: z.string(),
	OBSERVABILITY_LOGGING_LEVEL: z.string(),
	OBSERVABILITY_LOGGING_FORMAT: z.string(),
	OBSERVABILITY_LOGGING_SLOW_QUERY_THRESHOLD: z.string(),
	NEW_RELIC_LICENSE_KEY: z.string(),
	NEW_RELIC_APP_LOG_FORWARDING_ENABLED: z.string(),
	NEW_RELIC_DISTRIBUTED_TRACING_ENABLED: z.string(),
	NEW_RELIC_DEBUG_LOGGING: z.string(),
	SMTP_USER: z.string(),
	SMTP_PASS: z.string(),
	SMTP_HOST: z.string(),
	TWILIO_AUTH_TOKEN: z.string(),
	TWILIO_ACCOUNT_SID: z.string(),
	TWILIO_API_KEY: z.string(),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
	console.error("Invalid environment variables:", parsedConfig.error.format());
	process.exit(1);
}

const config = parsedConfig.data;

export default config;
