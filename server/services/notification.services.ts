// src/services/notification.services.ts

import { SendMail } from "entities/nodeMailer";
import { Twilio } from "entities/twilo";

type NotificationType = "email" | "sms";

interface NotificationPayload {
	type: NotificationType;
	payload: any;
}

export class NotificationService {
	private mailProvider: SendMail;
	private smsProvider: Twilio;

	constructor() {
		this.mailProvider = new SendMail();
		this.smsProvider = new Twilio();
	}

	async send({ type, payload }: NotificationPayload) {
		switch (type) {
			case "email":
				return this.mailProvider.send(payload);
			case "sms":
				return this.smsProvider.send(payload);
			default:
				throw new Error(`Unsupported notification type: ${type}`);
		}
	}
}

export const notificationService = new NotificationService();
