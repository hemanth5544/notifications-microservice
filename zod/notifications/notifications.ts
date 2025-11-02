import z from "zod";

export const ZNotification = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  channel: z.enum(["email", "sms", "push"]),
  title: z.string().min(1).max(200),
  message: z.string().min(1),
  provider: z.string().nullable().optional(),
  status: z.enum(["pending", "sent", "failed"]),
  error: z.string().nullable().optional(),
  metadata: z.record(z.any()).nullable().optional(),
  retryCount: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ZNotificationResponse = z.object({
  success: z.boolean(),
  data: ZNotification,
});

export const ZNotificationsResponse = z.object({
  success: z.boolean(),
  data: z.array(ZNotification),
});
