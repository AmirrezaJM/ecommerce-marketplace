import z from "zod";

export const registerSchema = z.object({
    email: z.email(),
    password: z.string().min(5),
    username: z.string().min(3, "username must be at least 3 characters").max(63, "username must be less than 63 characters")
        .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, " Username can only contain lowecase letters, numbers and it must end with a letter or number")
        .refine((val) => !val.includes("--"), "Username cannot contain consecutive hyphens")
        .refine((val) => !val.includes("admin"), "Username cannot be admin")
        .transform((val) => val.toLowerCase()),
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(5),
});