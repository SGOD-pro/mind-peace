"use client";
import React, { memo } from "react";
import SheetComp from "./components/SheetComp";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { Button } from "@/components/ui/button";
import ProfileEdit from "@/components/ProfileEdit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
//import ApiService from "@/helper/ApiService";
//const apiService = new ApiService("/api/auth");
//import { IndianRupee } from "lucide-react";

import HomeProfile from "./components/HomeProfile";
import "../style.css";
import Image from "next/image";
const FormSchema = z
	.object({
		currentPassword: z
			.string()
			.min(6, { message: "Password must be at least 6 characters." }),
		newPassword: z
			.string()
			.min(6, { message: "Password must be at least 6 characters." }),
		confirmPassword: z
			.string()
			.min(6, { message: "Password must be at least 6 characters." }),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "New password and confirm password must match.",
	});

function User() {
	const ProfileTriggerBtn = memo(() => {
		return (
			<Button variant={"outline"}>
				<span className="">Edit profile</span>
				<SettingsIcon />
			</Button>
		);
	});

	ProfileTriggerBtn.displayName = "ProfileTriggerBtn";
	const Content = memo(() => {
		const form = useForm<z.infer<typeof FormSchema>>({
			resolver: zodResolver(FormSchema),
		});
		function onSubmit(data: z.infer<typeof FormSchema>) {
			console.log(data)
		}
		return (
			<>
				<ProfileEdit />
				<div className="mt-8">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
							<FormField
								control={form.control}
								name="currentPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Current Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Enter your current password"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Enter your current password here.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>New Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="Enter your new password"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Your new password must be at least 6 characters long.
										</FormDescription>
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
												type="password"
												placeholder="Re-enter your new password"
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Please confirm your new password.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								disabled={
									!form.formState.isValid || form.formState.isSubmitting
								}
							>
								Update
							</Button>
						</form>
					</Form>
				</div>
			</>
		);
	});
	Content.displayName = "Content";

	return (
		<>
			<div className="grid grid-cols-[3fr,1fr] w-full gap-6 mt-4">
				<div className="space-y-6 font-lexend-deca">
					<HomeProfile />
					<section className="">
						<h2 className="text-2xl">Any Appointment?</h2>
						<div className="relative hidden">
							<div className="w-fit h-fit m-auto">
								<Image
									src={"/icons/Smiley_Face.svg"}
									alt="Nothing to show"
									width={400}
									height={400}
									className="w-[16rem] h-[16rem] object-contain"
								/>
							</div>
							<div className="absolute left-1/2 bottom-0 translate-x-[-50%] font-lexend-exa tracking-wider text-lg">
								Nothing💗
							</div>
						</div>
						<Table>
							<TableCaption>
								Your appointments {`(`}Last 7days{`)`}
							</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="">Patient Name</TableHead>
									<TableHead className="">Therapist</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Time</TableHead>
									<TableHead className="text-right">Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell className="font-medium capitalize">
										Souvik karmakar
									</TableCell>
									<TableCell>Dr. Simpal Kharel</TableCell>
									<TableCell>07/07/2005</TableCell>
									<TableCell className="">10:00 AM</TableCell>
									<TableCell className="text-right uppercase text-green-500">
										Pending
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</section>
				</div>
				<aside className="space-y-4">
					<div className="text-right">
						<SheetComp trigger={<ProfileTriggerBtn />} content={<Content />} />
					</div>
					<div className="side-cards text-sky-600">
						<h4 className="text-2xl">Appointments</h4>
						<h2 className="font-lexend-exa text-7xl text-center">07</h2>
						<p className="text-sm text-muted-foreground text-right">
							Joinin:- 26/09/24
						</p>
					</div>
					<div className="side-cards text-green-600">
						<h4 className="text-2xl">Spend</h4>
						<h2 className="font-lexend-exa text-7xl text-center">07</h2>
						<p className="text-sm text-muted-foreground text-right">
							Joinin:- 26/09/24
						</p>
					</div>
					<div className="side-cards text-rose-600">
						<h4 className="text-2xl">Canceled</h4>
						<h2 className="font-lexend-exa text-7xl text-center">07</h2>
						<p className="text-sm text-muted-foreground text-right">
							Joinin:- 26/09/24
						</p>
					</div>
				</aside>
			</div>
		</>
	);
}

export default User;
