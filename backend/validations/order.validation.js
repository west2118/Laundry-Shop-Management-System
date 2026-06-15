import { z } from "zod";

const orderItemSchema = z.object({
  service: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid service ID"),
  serviceName: z.string(),
  unit: z.string(),
  count: z.number().min(0.01),
  unitPrice: z.number().min(0),
  subtotal: z.number().min(0),
});

export const createOrderSchema = z.object({
  body: z.object({
    customer: z.union([
      z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid customer ID"),
      z.object({
        fullName: z.string().min(1),
        email: z.string().email().optional().or(z.literal("")),
        contact: z.string().min(1).optional().or(z.literal("")),
      })
    ]),
    items: z.array(orderItemSchema).min(1, "At least one item is required"),
    discount: z.number().min(0).max(100).optional(),
    itemDescription: z.string().optional().nullable(),
    specialInstructions: z.string().optional().nullable(),
    paymentStatus: z.string().optional(),
    totalAmount: z.number().min(0),
  }),
});

export const updateOrderStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID"),
  }),
  body: z.object({
    orderStatus: z.enum(["pending", "in-process", "ready", "picked-up"]).optional(),
    paymentStatus: z.enum(["pending", "paid"]).optional(),
  }),
});
