"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
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
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/Auth";
const apiService = new ApiService("/api/auth/");
const FormSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

function Signin() {
	const router = useRouter();
	const setUser=useAuthStore((state)=>state.setUser);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const res = await apiService.post<UserWithId>({
			data: data,
			endpoint: "/login",
		});
		if (res.data) {
			setUser(res.data);
		}
		router.push("/");
		
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-4 w-full font-lexend flex-1"
			>
				<h1 className="text-3xl font-bold text-center tracking-wider">
					SIGN IN
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
				<Button type="submit" className={"login-button"}>
					Login
				</Button>
			</form>
		</Form>
	);
}

export default Signin;
