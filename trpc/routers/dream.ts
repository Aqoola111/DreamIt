import {dreamFormSchema} from "@/features/dreams/schemas";
import {prisma} from "@/lib/prisma";
import {createTRPCRouter, protectedProcedure} from "@/trpc/init";
import {z} from "zod";

// const updateInput = DreamSchema.omit({
// 	createdAt: true,
// 	userId: true,
// 	updatedAt: true
// }).partial().extend({id: z.string()})

export const dreamRouter = createTRPCRouter({
	create: protectedProcedure.input(dreamFormSchema).mutation(async ({ctx, input}) => {
		const userId = ctx.user.id
		
		return prisma.$transaction(async (tx) => {
			const dream = await tx.dream.create({
				data: {
					userId: userId,
					description: input.description,
					dailyHours: input.dailyHours,
					intensity: input.motivation,
					status: 'ACTIVE',
				}
			})
			
			await tx.strategy.create({
				data: {
					dreamId: dream.id
				}
			})
			
			await tx.user.update({
				where: {id: userId},
				data: {hasActiveDream: true}
			})
			
			return dream
		})
	}),
	getById: protectedProcedure.input(z.object({id: z.string()})).query(async ({ctx, input}) => {
		return ctx.db.dream.findFirst({
			where: {id: input.id}, include: {
				strategies: true
			}
		})
	}),
	getByUser: protectedProcedure.query(async ({ctx}) => {
		return ctx.db.dream.findMany({where: {userId: ctx.user.id}})
	}),
	delete: protectedProcedure.input(z.object({id: z.string()})).mutation(async ({input, ctx}) => {
		return ctx.db.dream.delete({where: {id: input.id, userId: ctx.user.id}})
	}),
	// update: protectedProcedure.input(updateInput).mutation(async ({ctx, input}) => {
	//
	// })
})