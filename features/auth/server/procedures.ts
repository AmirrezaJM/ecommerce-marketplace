import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { z } from "zod";
export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();
        const session = await ctx.payload.auth({ headers })
        return session;
    }),
    register: baseProcedure.input(z.object({
        email: z.email(),
        password: z.string().min(5),
        username: z.string().min(3, "username must be at least 3 characters").max(63, "username must be less than 63 characters")
            .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, " Username can only contain lowecase letters, numbers and it must end with a letter or number")
            .refine((val) => !val.includes("--"), "Username cannot contain consecutive hyphens")
            .refine((val) => !val.includes("admin"), "Username cannot be admin")
            .transform((val) => val.toLowerCase()),
    })).mutation(async ({ input, ctx }) => {
        await ctx.payload.create({ collection: "users", data: { email: input.email, username: input.username, password: input.password } })
    }),

    login: baseProcedure.input(z.object({
        email: z.email(),
        password: z.string(),
    })).mutation(async ({ input, ctx }) => {
        const data = await ctx.payload.login({
            collection: "users",
            data: {
                email: input.email,
                password: input.password,
            }
        });
        if (!data.token) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
        }
        const cookie = await getCookies();
        cookie.set({
            name: AUTH_COOKIE_NAME,
            value: data.token,
            httpOnly: true,
            path: "/",
            // TODO: ensure corss-domain cookie sharing
            // funroad.com
            // antonio.funroad.com  cookie is not exist
        });
        return data;
    }),

    logout: baseProcedure.mutation(async ({ ctx }) => {
        const cookie = await getCookies();
        cookie.delete(AUTH_COOKIE_NAME);
    }),
});