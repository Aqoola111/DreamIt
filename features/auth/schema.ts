import {z} from "zod";

const PASSWORD_MIN_LENGTH = 2;
const PASSWORD_MAX_LENGTH = 256;
const NAME_MAX_LENGTH = 8;
const NAME_MIN_LENGTH = 4;

export const signUpSchema = z.object({
	email: z.email("Invalid email address"),
	name: z.string().min(NAME_MIN_LENGTH, `Name too short`).max(NAME_MAX_LENGTH, 'Name too long').trim().optional().or(z.literal("")),
	password: z.string().min(PASSWORD_MIN_LENGTH, `Password too short`).max(PASSWORD_MAX_LENGTH, 'Password too long'),
	confirmPassword: z.string().min(PASSWORD_MIN_LENGTH, `Password too short`).max(PASSWORD_MAX_LENGTH, 'Password too long')
}).refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ["confirmPassword"],
});

export const signInSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string()
})

export type SignInValues = z.infer<typeof signInSchema>
export type SignUpValues = z.infer<typeof signUpSchema>