"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ApiService from "@/helper/ApiService";
import useAuthStore from "@/store/Auth";
import { useState } from "react";
const apiService = new ApiService("/api/auth/");

import {useLoginForm} from "@/store/LoginForm"
const passwordRegex =
	/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

const FormSchema = z
	.object({
		email: z.string().email({ message: "Invalid email address." }),
		password: z
			.string()
			.min(6, { message: "Password must be at least 6 characters." })
			.regex(passwordRegex, {
				message:
					"Password must contain at least one uppercase letter, one number, and one special character.",
			}),
		confirmPassword: z
			.string()
			.min(6, { message: "Password must be at least 6 characters." }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ["confirmPassword"],
	});
function Signup() {
	const setIsOpen=useLoginForm(state=>state.setIsOpen);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	});

	const setUser=useAuthStore((state)=>state.setUser);
	const [key, setKey] = useState(0);
	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const res = await apiService.post<UserWithId>({
			data: data,
			endpoint: "/register",
		});
		if (res.data) {
			setUser(res.data);
			form.reset();
			setIsOpen(false);
			setKey(key + 1);
		}
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-4 w-full font-lexend flex-1 px-4"
				key={key}
			>
				<h1 className="text-3xl font-bold text-center tracking-wider">
					SIGN UP
				</h1>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Email"
									{...field}
									className="signup-input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="password"
									{...field}
									className="signup-input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder="confirm password"
									{...field}
									className="signup-input"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="login-button"
					disabled={!form.formState.isValid || form.formState.isSubmitting}
				>
					Create
				</Button>
			</form>
		</Form>
	);
}

export default Signup;
