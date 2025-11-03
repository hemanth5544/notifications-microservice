import { SendMail } from "entities/nodeMailer";

interface Provider {
	send: (params: {
		to: string;
		subject: string;
		text: string;
		html?: string;
	}) => Promise<void>;
}

class NotificationService {
	private providerList: Record<string, Provider>;
	private mailer: SendMail;

	constructor() {
		this.providerList = {};
		this.mailer = new SendMail();
	}

	async send(
		to: string,
		subject: string,
		text: string,
		html?: string,
		// providerType?: string,
	): Promise<void> {
		// if (providerType && this.providerList[providerType]) {
		// return await this.providerList[providerType].send({
		// 	to,
		// 	subject,
		// 	text,
		// 	html,
		// });
		// }

		await this.mailer.send({ to, subject, text, html });
	}

	registerProvider(name: string, provider: Provider) {
		this.providerList[name] = provider;
	}
}

export const notificationService = new NotificationService();
