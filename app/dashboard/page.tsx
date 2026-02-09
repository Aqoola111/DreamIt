import {auth} from "@/lib/auth";
import {trpc} from "@/trpc/server";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

const Page = async () => {
	
	const session = await auth.api.getSession({headers: await headers()});
	if (!session || !session.user || !session.user.id) {
		redirect('/auth/sign-in')
	}
	
	const dreams = await trpc.dream.getByUser()
	
	if (dreams.length > 0) {
		redirect(`/dashboard/${dreams[0].id}`);
	} else {
		redirect('/initialize');
	}
	
	return (
		<div>Page</div>
	)
}
export default Page
