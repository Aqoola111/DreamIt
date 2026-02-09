'use client'
import {Form} from "@/components/ui/form";
import {DescriptionStep} from "@/features/dreams/components/description-step";
import {HoursStep} from "@/features/dreams/components/hours-step";
import {IntensityStep} from "@/features/dreams/components/intensity-step";
import {WizardControls} from "@/features/dreams/components/wizard-controls";
import {dreamFormSchema, DreamFormValue} from "@/features/dreams/schemas";
import {cn} from "@/lib/utils";
import {trpc} from "@/trpc/client";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {ComponentType, ReactNode, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";

interface DreamFormInterface {
	mode: "initialize" | "create" | "update"
	viewMode: "wizard" | "single-page"
	initialValues?: DreamFormValue
	onSuccess?: () => void
	formClassName?: string
}


type DreamFormFields = keyof DreamFormValue

type dreamFieldToComponents = {
	title: DreamFormFields,
	component: ComponentType
}

const stepsComponents: dreamFieldToComponents[] = [
	{
		title: 'description',
		component: DescriptionStep,
	},
	{
		title: 'dailyHours',
		component: HoursStep,
	},
	{
		title: 'motivation',
		component: IntensityStep,
	}
]

const DreamForm = ({onSuccess, mode, initialValues, viewMode, formClassName}: DreamFormInterface) => {
	
	const [currentStep, setCurrentStep] = useState(0)
	
	const step = stepsComponents[currentStep]
	const StepComponent = step.component
	const title = step.title
	
	const utils = trpc.useUtils()
	const router = useRouter()
	
	const createDream = trpc.dream.create.useMutation({
		onSuccess: async (newDream) => {
			toast.success('Dream created!')
			await utils.dream.invalidate()
			router.push(`/dashboard/${newDream.id}`)
		},
		onError: (err) => {
			toast.error(`Failed to create Dream: ${err.message}`)
		}
	})
	
	const form = useForm<DreamFormValue>({
		resolver: zodResolver(dreamFormSchema),
		defaultValues: initialValues || {
			dailyHours: 0,
			description: '',
			motivation: 'BALANCED'
		}
	})
	
	const next = async () => {
		
		if (currentStep + 1 === stepsComponents.length) return
		
		const isStepValid = await form.trigger(title)
		
		if (isStepValid) setCurrentStep(prev => prev + 1)
	};
	
	const prev = () => {
		if (currentStep - 1 < 0) return
		setCurrentStep(prev => prev - 1)
	};
	
	
	const onSubmit = (data: DreamFormValue) => {
		createDream.mutate(data)
	}
	
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}
				  className={cn(formClassName, viewMode === 'wizard' && 'flex-1 justify-between flex flex-col')}>
				{viewMode === "wizard" ? (<>
					
					<StepComponent/>
					
					<WizardControls step={currentStep} isLast={currentStep === stepsComponents.length - 1}
									isFirst={currentStep === 0}
									onNext={next} onPrev={prev}/>
				</>) : (
					<></>
				)}
			</form>
		</Form>
	)
}

export default DreamForm