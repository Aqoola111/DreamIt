import {dreamRouter} from "@/trpc/routers/dream";
import {createTRPCRouter} from '../init';

export const appRouter = createTRPCRouter({
	dream: dreamRouter
});

export type AppRouter = typeof appRouter;