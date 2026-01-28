import { AUTH_COOKIE_NAME } from "@/lib/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { loginSchema, registerSchema } from "../schema/schemas";
export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();
        const session = await ctx.payload.auth({ headers })
        return session;
    }),
    register: baseProcedure.input(registerSchema)
    .mutation(async ({ input, ctx }) => {
        const existingData = await ctx.payload.find({
            collection: "users",
            limit: 1,
            where: {
                username: {
                    equals: input.username,
                },
            },
        });
        const existingUser = existingData.docs[0];
        if (existingUser) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "Username already exists" });
        }
        
        await ctx.payload.create({ collection: "users", data: { email: input.email, username: input.username, password: input.password } })
    }),

    login: baseProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
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