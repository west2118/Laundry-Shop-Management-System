import { z } from "zod";

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  }),
  body: z.object({
    firstName: z.string().min(1, "First name is required").max(50, "First name is too long").optional(),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long").optional(),
    role: z.enum(["admin", "staff"]).optional(),
  }),
});

export const updateStatusSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID"),
  }),
  body: z.object({
    status: z.enum(["active", "inactive"]),
  }),
});

export const getByIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID"),
  }),
});
