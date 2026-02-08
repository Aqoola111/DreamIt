import {Button} from "@/components/ui/button";
import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import {FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DreamFormValue} from "@/features/dreams/schemas";
import {StrategyIntensity} from "@/generated/prisma/enums";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {useFormContext} from "react-hook-form";

const INTENSITY_CONFIG = {
	[StrategyIntensity.SOFT]: {
		label: "BARELY",
		image: "/almost_not_motivated.png",
		activeClass: "border-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.3)]",
		textClass: "text-sky-500",
	},
	[StrategyIntensity.BALANCED]: {
		label: "FINE",
		image: "/almost_not_motivated.png",
		activeClass: "border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]",
		textClass: "text-violet-500",
	},
	[StrategyIntensity.HARDCORE]: {
		label: "PRETTY MUCH",
		image: "/motivated.png",
		activeClass: "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]",
		textClass: "text-red-500",
	},
} as const;

export const IntensityStep = () => {
	const {formState, control, watch} = useFormContext<DreamFormValue>()
	const value = watch('motivation')
	return (
		<FormField control={control} name={'motivation'} render={({field}) => (
			<FormItem className='animate-in fade-in duration-300 flex flex-col min-h-fit pb-10 overflow-hidden'>
				<FormLabel className='text-2xl text-center'>
					How motivated are you
					<span className='font-bold font-mono text-center bg-violet-500 text-white rounded-md px-2 py-2 mt-3'>
						{INTENSITY_CONFIG[value].label}
					</span>
				</FormLabel>
				<FieldError>{formState.errors.dailyHours?.message ||
                    <span className="invisible text-sm">Placeholder</span>}</FieldError>
				<div className='flex gap-1 items-center justify-center mt-4'>
					{Object.entries(INTENSITY_CONFIG).map(([key, config]) => {
						const intensityKey = key as StrategyIntensity;
						const isSelected = value === intensityKey;
						return (
							<div onClick={() => field.onChange(intensityKey)} key={key}
								 className='flex flex-col items-center group'>
								<div
									className={cn('h-[400px] relative w-[200px] group-hover:w-[220px] overflow-hidden rounded-2xl  transition-all duration-500',
										isSelected && config.activeClass
									)}>
									<Image
										className={cn(
											'object-cover transition-all duration-500',
											!isSelected && 'grayscale group-hover:grayscale-0'
										)}
										fill
										src={config.image}
										alt={config.label}
									/>
								</div>
								<h1 className={cn(
									'font-mono font-bold mt-2 transition-colors',
									isSelected ? 'text-violet-500' : 'text-slate-400 group-hover:text-slate-200'
								)}>
									{config.label}
								</h1>
							</div>
						)
					})}
				</div>
			
			</FormItem>
		)}>
		</FormField>
	
	)
};