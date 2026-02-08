import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import DreamForm from "@/features/dreams/components/dream-form";

const Page = () => {
	return (
		<div className='min-h-screen flex items-center justify-center w-full mx-auto bg-gradient-to-tl from-violet-300 via-violet-400 to-indigo-600'>
			<Card className='max-w-2xl mx-auto w-full flex-col flex drop-shadow-2xl animate-in fade-down duration-200'>
				<CardHeader>
					<CardTitle>
						Create your dream
					</CardTitle>
					<CardDescription>
						This dream wizard will guide you
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col flex-1'>
					<DreamForm mode={'initialize'} viewMode={'wizard'}/>
				</CardContent>
			</Card>
		</div>
	)
}
export default Page
