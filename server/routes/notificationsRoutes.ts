import express from "express";
import { notificationsHandler } from "@handlers/notifications.Handlers";

const router = express.Router();

router.get("/notifications", notificationsHandler.sendNotifcication);

export default router;
