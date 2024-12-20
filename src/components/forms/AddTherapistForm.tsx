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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FileInput from "../ui/FileInput";
import ApiService from "@/helper/ApiService";
import { memo, useState } from "react";
import useTherapistStore from "@/store/Therapist";
const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
// Define Zod schema for validation
const FormSchema = z.object({
	name: z.string().min(2, { message: "Full Name is required" }),
	qualification: z
		.string()
		.min(1, { message: "Please select a qualification" }),
	experience: z.number().min(1, { message: "Experience is required" }),
	speciality: z.string().min(1, { message: "Please select a speciality" }),
	email: z.string().email({ message: "Enter a valid email address" }),
	contactNo: z
		.string()
		.regex(/^[0-9]{10,}$/, { message: "At least 10 digits required" }),
	timing: z.object({
		from: z.string(),
		to: z.string(),
	}),
	days: z.array(z.string()).transform((days) => {
		const dayOrder = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		return days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
	}),
	clinicLocation: z.string().min(1, { message: "Clinic Location is required" }),
	charges: z.number().min(1, { message: "Charges are required" }),
	image: z.instanceof(File).optional(),
});
export type TherapistFormInterface = z.infer<typeof FormSchema>;
const apiService = new ApiService("/api/therapist/");
function AddTherapistForm({ defaultValues }: { defaultValues?: Therapists }) {
	const addItem = useTherapistStore((state) => state.addItem);
	const updateItem = useTherapistStore((state) => state.updateItem);
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: defaultValues?.name || "",
			qualification: defaultValues?.qualification || "",
			experience: defaultValues?.experience || 0,
			speciality: defaultValues?.speciality || "",
			email: defaultValues?.email || "",
			contactNo: defaultValues?.contactNo || "",
			timing: {
				from: defaultValues?.timing?.from || "",
				to: defaultValues?.timing?.to || "",
			},
			days: defaultValues?.days || [],
			clinicLocation: defaultValues?.clinicLocation || "",
			charges: defaultValues?.charges || 0,
			image: undefined,
		},
	});
	const [key, setKey] = useState(0);
	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (defaultValues) {
			const response = await apiService.put<Therapists>({
				data,
				endpoint: `/id=${defaultValues._id}`,
			});
			if (response.success && response.data) {
				updateItem(response.data);
			}
		} else {
			const response = await apiService.post<Therapists>({
				data,
				isMultipart: true,
			});
			if (response.success && response.data) {
				form.reset();
				setKey((prev) => prev + 1);
				addItem(response.data);
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid sm:grid-cols-2 gap-3"
				key={key}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input placeholder="Full name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="qualification"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Qualification</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select qualification" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="MD in Psychiatry">
											MD in Psychiatry
										</SelectItem>
										<SelectItem value="DNB in Psychiatry">
											DNB in Psychiatry
										</SelectItem>
										<SelectItem value="MA or MSc in Psychology">
											MA or MSc in Psychology
										</SelectItem>
										<SelectItem value="PhD in Psychology">
											PhD in Psychology
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="experience"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Experience</FormLabel>
							<FormControl>
								<Input
									type="number"
									value={field.value.toString()}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="speciality"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Speciality</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select speciality" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Neuropsych">Neuropsychology</SelectItem>
										<SelectItem value="Psychologist">Psychologist</SelectItem>
										<SelectItem value="Psychotherapist">
											Psychotherapist
										</SelectItem>
										<SelectItem value="Psychiatry">Psychiatry</SelectItem>
										<SelectItem value="Family Therapist">
											Family Therapist
										</SelectItem>
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="contactNo"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contact Number</FormLabel>
							<FormControl>
								<Input
									type="tel"
									placeholder="At least 10 digits"
									maxLength={10}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="timing.from"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Timing (From)</FormLabel>
							<FormControl>
								<Input type="time" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="timing.to"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Timing (To)</FormLabel>
							<FormControl>
								<Input type="time" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="days"
					render={() => (
						<FormItem>
							<FormLabel className="text-base">Days Available</FormLabel>

							<DropdownMenu modal={false}>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" className="w-full">
										Select Days
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>Select Available Days</DropdownMenuLabel>
									<DropdownMenuSeparator />
									{days.map(
										(day) => (
											<FormField
												key={day}
												control={form.control}
												name="days"
												render={({ field }) => (
													<DropdownMenuItem
														onSelect={(event) => event.preventDefault()}
													>
														<FormItem className="flex flex-row items-center space-x-3">
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(day)}
																	onCheckedChange={(checked) => {
																		const updatedDays = checked
																			? [...field.value, day]
																			: field.value.filter(
																					(d: string) => d !== day
																			  );
																		field.onChange(updatedDays);
																	}}
																/>
															</FormControl>
															<FormLabel className="font-normal">
																{day}
															</FormLabel>
														</FormItem>
													</DropdownMenuItem>
												)}
											/>
										)
									)}
								</DropdownMenuContent>
							</DropdownMenu>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="clinicLocation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Clinic Location</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="charges"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Charges</FormLabel>
							<FormControl>
								<Input
									type="number"
									value={field.value.toString()}
									onChange={(e) => field.onChange(Number(e.target.value))}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							<FormControl>
								<FileInput
									onChange={field.onChange}
									accept="image/*"
									disabled={defaultValues ? true : false}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					disabled={!form.formState.isValid || form.formState.isSubmitting}
				>
					Submit
				</Button>
			</form>
		</Form>
	);
}
export default memo(AddTherapistForm);
