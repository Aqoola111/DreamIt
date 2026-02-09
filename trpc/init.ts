import {auth} from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import {initTRPC, TRPCError} from '@trpc/server';
import {headers as nextHeaders} from "next/headers";
import {cache} from 'react';

export const createTRPCContext = cache(async () => {
	return {
		db: prisma
	}
});

const t = initTRPC.context<typeof createTRPCContext>().create();

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ctx, next}) => {
	const sessionData = await auth.api.getSession({headers: await nextHeaders()})
	
	if (!sessionData || !sessionData.user || !sessionData.session) {
		throw new TRPCError({code: 'UNAUTHORIZED'})
	}
	
	return next({
		ctx: {
			...ctx,
			user: sessionData.user,
			session: sessionData.session,
		}
	});
})
