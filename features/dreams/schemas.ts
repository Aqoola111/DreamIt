import {StrategyIntensity} from "@/generated/prisma/enums";
import {z} from "zod";

export const MAX_DREAM_LENGTH = 255;
export const MIN_DREAM_LENGTH = 24;

export const dreamFormSchema = z.object({
	description: z.string().min(MIN_DREAM_LENGTH, 'Dream too short').max(MAX_DREAM_LENGTH, 'Try fitting into less symbols'),
	motivation: z.enum(StrategyIntensity, {
		error: 'Please select a valid motivation level'
	}),
	dailyHours: z
		.number("Please enter a number")
		.min(0.5, "Minimum 30 minutes (0.5h) required for progress")
		.max(16, "Be realistic, you need to sleep!")
		.multipleOf(0.5),
})

export type DreamFormValue = z.infer<typeof dreamFormSchema>;