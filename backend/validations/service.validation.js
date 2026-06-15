import { z } from "zod";

export const createServiceSchema = z.object({
  body: z.object({
    serviceName: z.string().min(1, "Service name is required").max(100),
    description: z.string().max(500).optional(),
    category: z.enum(["Basic", "Premium", "Express", "Additional"]),
    pricePerKg: z.number().min(0).optional().nullable(),
    pricePerItem: z.number().min(0).optional().nullable(),
    unitType: z.enum(["kg", "item"]),
    processingTime: z.number().min(1),
  }),
});

export const updateServiceSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID"),
  }),
  body: z.object({
    serviceName: z.string().min(1, "Service name is required").max(100).optional(),
    description: z.string().max(500).optional(),
    category: z.enum(["Basic", "Premium", "Express", "Additional"]).optional(),
    pricePerKg: z.number().min(0).optional().nullable(),
    pricePerItem: z.number().min(0).optional().nullable(),
    unitType: z.enum(["kg", "item"]).optional(),
    processingTime: z.number().min(1).optional(),
    status: z.enum(["active", "inactive"]).optional(),
  }),
});
