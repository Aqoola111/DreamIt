'use client'
import {signInSchema, SignInValues} from "@/features/auth/schema";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {Form} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {authClient} from "@/lib/auth-client";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useForm} from "react-hook-form";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {toast} from "sonner";

const Page = () => {
	
	const signInForm = useForm<SignInValues>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})
	
	const onSubmit = async (data: SignInValues) => {
		try {
			await authClient.signIn.email({
				email: data.email,
				password: data.password,
				callbackURL: '/dashboard'
			}, {
				onError: (ctx) => {
					toast.error(`Failed to login ${ctx.error.message}`)
				}
			})
		} catch (error) {
		
		}
	}
	
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>
					Welcome back to DreamIt
				</CardTitle>
				<CardDescription>
					The place where dreams are reverse-engineered into reality.
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-3'>
				<Form {...signInForm}>
					<form className='contents' onSubmit={signInForm.handleSubmit(onSubmit)}>
						<Field>
							<FieldLabel>
								Email address
							</FieldLabel>
							<Input
								{...signInForm.register("email")}
							/>
							<FieldError>{signInForm.formState.errors.email?.message}</FieldError>
						</Field>
						<Field>
							<FieldLabel>
								Password
							</FieldLabel>
							<Input
								{...signInForm.register("password")}
							/>
							<FieldError>{signInForm.formState.errors.password?.message}</FieldError>
						</Field>
						<Button>
							Return to the journey
						</Button>
					</form>
				</Form>
				<Separator/>
				<div className='flex w-full justify-between'>
					<Button variant='outline' onClick={() => {
					}}>
						Continue with google
						<FaGoogle/>
					</Button>
					<Button variant='outline' onClick={() => {
					}}>
						Continue with Github
						<FaGithub/>
					</Button>
				</div>
				<Separator/>
				<Button variant='link'>
					<Link href={'/auth/sign-up'}>
						Don&apos;t have an account?
					</Link>
				</Button>
			
			</CardContent>
		</Card>
	)
}
export default Page
