import { initContract } from "@ts-rest/core";
import { healthContract } from "./health";
import { userContract } from "./users";
import { notificationsContract } from "./notifications";

const c = initContract();

export const apiContract = c.router({
	Health: healthContract,
	Users: userContract,
	Notifications: notificationsContract,
});
