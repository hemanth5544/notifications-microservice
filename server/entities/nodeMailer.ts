import nodemailer, { Transporter } from "nodemailer";
import { NotificationProvider } from "../entities/provider";

interface SendMailParams {
	to: string;
	subject: string;
	text: string;
	html?: string;
}

export class SendMail extends NotificationProvider {
	private transporter: Transporter;

	constructor() {
		super();

		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST || "smtp.gmail.com",
			port: Number(process.env.SMTP_PORT) || 587,
			secure: false,
			auth: {
				user: process.env.SMTP_USER || "",
				pass: process.env.SMTP_PASS || "",
			},
		});
	}

	async send({ to, subject, text, html }: SendMailParams): Promise<void> {
		console.log("herrrrrrrrrrr", to, subject, text);

		try {
			const info = await this.transporter.sendMail({
				from:
					process.env.SMTP_FROM ||
					process.env.SMTP_USER ||
					"noreply@example.com",
				to,
				subject,
				text,
				html,
			});

			console.log("Email sent:", info.messageId);
		} catch (error: any) {
			this.throwGeneralAxiosError(error);
		}
	}
}
