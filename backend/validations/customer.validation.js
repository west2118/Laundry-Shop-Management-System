import { z } from "zod";

export const createCustomerSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, "Full name is required").max(100),
    email: z.string().email("Invalid email format"),
    contact: z.string().min(1, "Contact is required").max(20),
  }),
});

export const updateCustomerSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID"),
  }),
  body: z.object({
    fullName: z.string().min(1, "Full name is required").max(100).optional(),
    email: z.string().email("Invalid email format").optional(),
    contact: z.string().min(1, "Contact is required").max(20).optional(),
  }),
});
