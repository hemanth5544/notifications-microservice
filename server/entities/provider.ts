export class NotificationProvider {
	// async send() {
	//     throw new Error("Have to override Notification.send(...)");
	// }

	throwGeneralAxiosError(error: any) {
		let msg = "Error: " + error + " ";

		if (error.response && error.response.data) {
			if (typeof error.response.data === "string") {
				msg += error.response.data;
			} else {
				msg += JSON.stringify(error.response.data);
			}
		}

		throw new Error(msg);
	}
}
