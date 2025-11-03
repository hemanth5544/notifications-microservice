import type { Request, Response } from "express";
import { userService } from "@services/user.services";
import { logger } from "@logger/logger";
import { ZUser } from "@zod/User/user";
import { ZNotification } from "@zod/notifications/notifications";
import { notificationService } from "@services/notification.services";

export const notificationsHandler = {
	async sendNotifcication(req: Request, res: Response) {
		try {
			await notificationService.send(
				"hemanth",
				"hemanth",
				"hemanth",
				"hemanth",
			);
			res.status(200).json({ success: true, data: "datta sent" });
		} catch (error: any) {
			console.log(error);
		}
	},
};
