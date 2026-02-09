interface dreamParams {
	dreamId: string
}

interface dreamPageProps {
	params: Promise<dreamParams> // Теперь это Promise!
}

const DreamPage = async ({params}: dreamPageProps) => {
	const {dreamId} = await params
	return (
		<div>
			Dream {dreamId}
		</div>
	)
}
export default DreamPage
