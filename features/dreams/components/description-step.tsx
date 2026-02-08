import {AutosizeTextarea} from "@/components/ui/autosize-text-area";
import {Field, FieldDescription, FieldLabel} from "@/components/ui/field";
import {FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {DreamFormValue, MAX_DREAM_LENGTH} from "@/features/dreams/schemas";
import Image from "next/image";
import {useFormContext} from "react-hook-form";


export const DescriptionStep = () => {
	const {control, formState} = useFormContext<DreamFormValue>()
	return (
		<FormField control={control} name={'description'} render={({field}) => (
			<FormItem className='animate-in fade-in duration-300 '>
				<FieldLabel>
					Describe your dream
				</FieldLabel>
				<FieldDescription>
					{field.value.length} / {MAX_DREAM_LENGTH}
				</FieldDescription>
				<AutosizeTextarea minHeight={100} maxHeight={120} defaultValue={field.value} onChange={field.onChange}/>
				<FormMessage>
					{formState.errors.dailyHours?.message ||
                        <span className="invisible text-sm">Placeholder</span>}
				</FormMessage>
				<div className='h-[400px] relative '>
					<Image className='object-contain ' fill
						   src={formState.errors.description?.message ? '/disappointed.png' : '/thinking.png'}
						   alt={'description-image'}/>
				</div>
			</FormItem>
		)}>
		</FormField>
	)
};