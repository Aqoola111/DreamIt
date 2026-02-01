'use client'
import {signUpSchema, SignUpValues} from "@/features/auth/schema";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {Form} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {authClient} from "@/lib/auth-client";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {toast} from "sonner";
import {generateUsername} from "unique-username-generator";

const Page = () => {
	
	const signUpForm = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
			name: ''
		}
	})
	
	const router = useRouter()
	
	const onSubmit = async (values: SignUpValues) => {
		
		try {
			const finalUser = values.name && values.name.trim().length > 0 ? values.name : generateUsername("", 0, 8)
			await authClient.signUp.email({
				email: values.email,
				password: values.password,
				name: finalUser,
				callbackURL: '/initialize'
			}, {
				onError: (ctx) => {
					toast.error(`Failed to create user: ${ctx.error.message}`)
				},
				onSuccess: (ctx) => {
					router.refresh();
					router.push("/initialize");
				}
			})
		} catch (error) {
			toast.error('Failed to create user')
		}
	}
	
	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>
					Welcome to DreamIt
				</CardTitle>
				<CardDescription>
					The place where dreams are reverse-engineered into reality.
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-3'>
				<Form {...signUpForm}>
					<form className='contents' onSubmit={signUpForm.handleSubmit(onSubmit)}>
						<Field>
							<FieldLabel>
								Email address
							</FieldLabel>
							<Input
								placeholder="example@mail.com"
								{...signUpForm.register("email")}
							/>
							<FieldError>{signUpForm.formState.errors.email?.message}</FieldError>
						</Field>
						<Field>
							<FieldLabel>
								Name
							</FieldLabel>
							<Input
								required={false}
								placeholder="John Smith"
								{...signUpForm.register("name")}
							/>
							<FieldError>{signUpForm.formState.errors.name?.message}</FieldError>
						</Field>
						<Field>
							<FieldLabel>
								Password
							</FieldLabel>
							<Input
								type='password'
								placeholder="••••••••"
								{...signUpForm.register("password")}
							/>
							<FieldError>{signUpForm.formState.errors.password?.message}</FieldError>
						</Field>
						<Field>
							<FieldLabel>
								Confirm password
							</FieldLabel>
							<Input
								type='password'
								placeholder="••••••••"
								{...signUpForm.register("confirmPassword")}
							/>
							<FieldError>{signUpForm.formState.errors.confirmPassword?.message}</FieldError>
						</Field>
						<Button>
							Forge My Strategy
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
					<Link href={'/auth/sign-in'}>
						Already have an account?
					</Link>
				</Button>
			
			</CardContent>
		</Card>
	)
}
export default Page
