import {Button} from "@/components/ui/button";
import {DreamFormValue} from "@/features/dreams/schemas";
import {Loader2} from "lucide-react";
import {useFormContext} from "react-hook-form";

interface WizardControlsProps {
	step: number;
	isLast: boolean;
	isFirst: boolean;
	onNext: () => void;
	onPrev: () => void;
	submitText?: string;
}

export const WizardControls = ({
								   isFirst,
								   onPrev,
								   isLast,
								   onNext,
								   submitText = "Forge my dream",
							   }: WizardControlsProps) => {
	const {formState} = useFormContext<DreamFormValue>();
	
	return (
		<div className="flex justify-between">
			<Button
				type="button"
				variant="outline"
				disabled={isFirst}
				onClick={(e) => {
					e.preventDefault();
					onPrev();
				}}
			>
				Previous Step
			</Button>
			
			{!isLast ? (
				<Button
					type="button"
					variant="outline"
					onClick={(e) => {
						e.preventDefault();
						onNext();
					}}
				>
					Next
				</Button>
			) : (
				<Button
					type="submit"
					disabled={formState.isSubmitting}
					className="bg-violet-600 hover:bg-violet-700 min-w-[140px]"
				>
					{formState.isSubmitting ? (
						<span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin"/>
              Forging...
            </span>
					) : (
						submitText
					)}
				</Button>
			)}
		</div>
	);
};