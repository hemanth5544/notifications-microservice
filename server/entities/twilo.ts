import { NotificationProvider } from "../entities/provider";
import axios from "axios";

interface SendMailParams {
	twilioApiKey: string;
	twilioAccountSID: string;
	twilioFromNumber: string;
	twilioToNumber: string;
	twilioAuthToken: string;
	msg: string;
}

export class Twilio extends NotificationProvider {
	name = "twilio";

	async send({
		twilioApiKey,
		twilioAccountSID,
		twilioFromNumber,
		twilioToNumber,
		msg,
		twilioAuthToken,
	}: SendMailParams) {
		const okMsg = "Sent Successfully.";

		let apiKey = twilioApiKey;

		try {
			let config = {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
					Authorization:
						"Basic " +
						Buffer.from(apiKey + ":" + twilioAuthToken).toString("base64"),
				},
			};
			// config = this.getAxiosConfigWithProxy(config);

			let data = new URLSearchParams();
			data.append("To", twilioToNumber);
			data.append("From", twilioFromNumber);
			data.append("Body", msg);

			await axios.post(
				`https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSID}/Messages.json`,
				data,
				config,
			);

			return okMsg;
		} catch (error) {
			this.throwGeneralAxiosError(error);
		}
	}
}
