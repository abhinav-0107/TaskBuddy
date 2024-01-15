import { z } from "zod";
export declare const credentialsInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type credentialParams = z.infer<typeof credentialsInput>;
