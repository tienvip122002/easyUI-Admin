import { z } from "zod";

export const CartSchema = z.object({
  id: z.string(),
  uiComponentId: z.string(),
  uiComponentName: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.date()
});

export type Cart = z.infer<typeof CartSchema>;

export const CreateCartSchema = z.object({
  uiComponentId: z.string(),
  quantity: z.number().min(1)
});

export type CreateCartRequest = z.infer<typeof CreateCartSchema>;

export const UpdateCartSchema = z.object({
  quantity: z.number().min(0)
});

export type UpdateCartRequest = z.infer<typeof UpdateCartSchema>; 