import * as z from "zod";
export const formSchema = z.object({
  caption: z.string().min(2).max(400),
  imageUrl: z.string(),
  location: z.string(),
  tags: z.string(),
});
export const formSchema2 = z.object({
  username: z.string().min(2).max(50),
  name: z.string().min(3).max(20),
  email: z.string(),
  password: z.string(),
});

export const formSchema3 = z.object({
  email: z.string(),
  password: z.string(),
});
