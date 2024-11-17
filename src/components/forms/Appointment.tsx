"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PaymentForm } from "./PaymentForm";
import ApiService from "@/helper/ApiService";
const apiService = new ApiService("/api/therapist/appointment");
const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 5 characters.",
	}),
    age: z.number().nonnegative({ message: "Age must be a positive number." }),
});

export default function AppointmentForm({charges,id}:{charges:number,id:string}) {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
            age: 0,
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const val={...data,therapistId:id,charges};
		await apiService.post({data:val});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="Susmita Sen" {...field} />
							</FormControl>
							<FormDescription>
								Paitent Name
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Age</FormLabel>
							<FormControl>
								<Input placeholder="10" {...field} type="number" onChange={(e) => field.onChange(e.target.valueAsNumber)} min={10}/>
							</FormControl>
							<FormDescription>
								Paitent Age
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<PaymentForm/>
				<Button
					className="px-4 py-2 rounded-lg"
					//onClick={(e) => handleClick(e)}
					disabled={!form.formState.isValid || !form.formState.isSubmitting}
				>
					PAY {charges}
				</Button>
			</form>
		</Form>
	);
}
