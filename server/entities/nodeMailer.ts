import nodemailer, { Transporter } from "nodemailer";
import { NotificationProvider } from "../entities/provider";
import config from "@config/config";

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
  			service: "gmail",
			// port: Number(config.) || 587,
			// secure: false,
			auth: {
				user: config.SMTP_USER || "",
				pass: config.SMTP_PASS || "",
			},
		});
	}

	async send({ to, subject, text, html }: SendMailParams): Promise<void> {

		try {
			const info = await this.transporter.sendMail({
				from: config.SMTP_USER,
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
