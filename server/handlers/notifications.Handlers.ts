import type { Request, Response } from "express";
import { notificationService } from "@services/notification.services";

export const notificationsHandler = {
	async sendNotifcication(req: Request, res: Response) {
		try {
			// Example request body structure:
			req.body = {
				type: "email",
				payload: {
					to: "user@example.com",
					subject: "Hello",
					text: "Welcome!",
				},
			};

			await notificationService.send(req.body);

			res.status(200).json({ success: true, data: "Notification sent" });
		} catch (error: any) {
			console.error(error);
			res.status(500).json({ success: false, error: error.message });
		}
	},
};
