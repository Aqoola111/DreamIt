import {Field, FieldDescription, FieldError, FieldLabel} from "@/components/ui/field";
import {FormControl, FormField, FormItem} from "@/components/ui/form";
import {Slider} from "@/components/ui/slider";
import {DreamFormValue} from "@/features/dreams/schemas";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";

export const HoursStep = () => {
	const {control, formState, watch} = useFormContext<DreamFormValue>()
	const [error, setError] = useState<boolean>(false);
	const value = watch('dailyHours')
	const FIELD_NAME = "dailyHours"
	
	return (
		<FormField control={control} name='dailyHours' render={({field}) => (
			<FormItem className='animate-in fade-in duration-300 '>
				<FieldLabel htmlFor={`${FIELD_NAME}`}>
					I am willing to deduct
					<span
						className="inline-block min-w-[4ch] font-bold text-center font-mono tabular-nums text-violet-500">
    {value}
  </span>
					hours a day
				</FieldLabel>
				<FormControl>
					<Slider
						id={`${FIELD_NAME}`}
						defaultValue={[0.5]}
						step={0.5}
						max={16}
						value={[field.value]}
						onValueChange={(vals) => field.onChange(vals[0])}
					/>
				</FormControl>
				<FieldError className='min-h-[30px]'>{formState.errors.dailyHours?.message ||
                    <span className="invisible text-sm">Placeholder</span>}</FieldError>
				<div className='h-[400px] relative '>
					<Image className='object-contain ' fill
						   src={formState.errors.dailyHours?.message ? '/disappointed.png' : '/watch.png'}
						   alt={'description-image'}/>
				</div>
			
			</FormItem>
		)}>
		</FormField>
	)
};