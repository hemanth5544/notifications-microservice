import { Router } from "express";
import healthRoutes from "./healthRoutes";
import userRoutes from "./userRoutes";
import notificationsRoutes from "./notificationsRoutes";

const router = Router();

router.use(healthRoutes);
router.use(userRoutes);
router.use(notificationsRoutes);

export default router;
