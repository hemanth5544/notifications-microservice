import { initContract } from "@ts-rest/core";
import { ZNotificationResponse } from "@zod/notifications/notifications";

const c = initContract();

export const notificationsContract = c.router({
	getNotification: {
		summary: "Get Notification status",
		path: "/notifications",
		method: "GET",
		description: "Get Notification status",
		responses: {
			200: ZNotificationResponse,
		},
	},
});
