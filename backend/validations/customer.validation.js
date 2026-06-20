import { z } from "zod";

export const createCustomerSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, "Full name is required").max(100),
    email: z.string().email("Invalid email format").optional().or(z.literal("")),
    contact: z.string().min(1, "Contact is required").max(20).optional().or(z.literal("")),
  }),
});

export const updateCustomerSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID"),
  }),
  body: z.object({
    fullName: z.string().min(1, "Full name is required").max(100).optional(),
    email: z.string().email("Invalid email format").optional().or(z.literal("")),
    contact: z.string().min(1, "Contact is required").max(20).optional().or(z.literal("")),
  }),
});

export const deleteCustomerSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID"),
  }),
});
