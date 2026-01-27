import { authRouter } from '@/features/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from "@/features/categories/server/procedures";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;