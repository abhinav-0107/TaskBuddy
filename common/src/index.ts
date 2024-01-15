import { z } from "zod";

export const credentialsInput = z.object({
  username: z.string().min(7).max(21).email(),
  password: z.string().min(2).max(10),
});

export type credentialParams = z.infer<typeof credentialsInput>;
