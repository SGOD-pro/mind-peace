"use client";
import React, { memo, useState } from "react";
import TiltCard from "./components/TiltCard";
import Image from "next/image";
import SheetComp from "../user/components/SheetComp";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import CalenderComp from "./components/CalenderComp";
import ProfileEdit from "@/components/ProfileEdit";
import AddTherapistForm from "@/components/forms/AddTherapistForm";
import { CheckCheck,Undo2 } from "lucide-react";
import ChartComp from "./components/ChartComp";

function TherapistHomePage() {
	const ProfileTriggerBtn = memo(() => {
		return (
			<Button variant={"outline"}>
				<span>Edit</span>
				<SettingsIcon />
			</Button>
		);
	});
	ProfileTriggerBtn.displayName = "ProfileTriggerBtn";
	const Content = memo(() => {
		return (
			<div className="space-y-3">
				<ProfileEdit />
				<AddTherapistForm />
			</div>
		);
	});
	Content.displayName = "Content";
	const Rows = memo(({ data }: { data: any }) => {
		const [disable, setDisable] = useState(false);
		return (
			<li className="flex justify-between items-center p-3 rounded-xl bg-muted/60">
				<h6 className="">Name</h6>
				<div className="space-x-2">
					<Button size={"icon"}>
						<CheckCheck />
					</Button>
					<Button size={"icon"} variant={"destructive"}>
						<Undo2 />
					</Button>
				</div>
			</li>
		);
	});
	Rows.displayName = "Rows";
	return (
		<div className="font-lexend-deca mt-4 grid grid-cols-[2.1fr,.9fr] gap-4 h-[calc(100%-1rem)]">
			<div className=" space-y-4">
				<section className="flex justify-between items-center border p-3 rounded-2xl">
					<div className="flex gap-4 items-center">
						<div className="w-48 h-48 flex items-center justify-center">
							<div className=" w-44 h-44 hover:p-2 hover:border transition-all box-content border-foreground rounded-full">
								<Image
									src={
										"https://storage.googleapis.com/academid-ledger.appspot.com/therapistImages/IMG-bc884c29-009b-4f92-9e06-5bc7e6cb9f51-1731075354265?GoogleAccessId=firebase-adminsdk-75gp6%40academid-ledger.iam.gserviceaccount.com&Expires=16446997800&Signature=GScuFA7lWfxEuLFmjUzxLwxTj2QrGoyFCG7pNL8Q6wKwGEoyvEM8uht90Yp05P6%2F3vHZL2uXX8b8yopLfGHz3CwVaOdIynF8cA1IXRoEZpuhTU5LD6Oz2XDPOqGmcJdaimfIJ9mONZ%2Buq%2FJG%2BWPjy%2BpBonXb8CNYBY3tAi16HmfgWXN5iedXgQhjs5XvnoyPy0GA961stWJ49H6Aywtly53%2FhkDFn9GXuzdghhyrILzzi1trlYM1IIMpyIb8dKTwqhd2icqOm%2Fu68Hsd8fM48ud7RELM9Je8Iro7sB3hLKXd2ciSSCJ0MQwvKBv2VQe%2FbvRqX9vJco4LZcqqJ%2FXPNw%3D%3D"
									}
									alt=""
									width={500}
									height={500}
									className="rounded-full w-full h-full object-cover object-top"
								/>
							</div>
						</div>
						<div className="">
							<h1 className="text-5xl mb-3">
								Good Evening, <br />
								<span className=" capitalize text-4xl">Dr. Bangru Bose</span>
							</h1>
							<SheetComp
								content={<Content />}
								trigger={<ProfileTriggerBtn />}
							/>
						</div>
					</div>
					<div className=" space-y-3">
						<TiltCard
							className="border bg-muted rounded-xl p-3 text-sky-600 border-foreground"
							tiltAngle={10}
						>
							<h3 className="text-3xl">Total Patient</h3>
							<h4 className="text-center text-5xl">07</h4>
						</TiltCard>
						<TiltCard
							className="border bg-muted rounded-xl p-3 text-green-500 border-foreground"
							tiltAngle={10}
						>
							<h3 className="text-3xl">Profit</h3>
							<h4 className="text-center text-5xl">07</h4>
						</TiltCard>
					</div>
				</section>
				<section className=" max-h-[50dvh] overflow-hidden">
					<ChartComp/>
				</section>
			</div>
			<aside className="h-full max-h-dvh overflow-auto border rounded-2xl p-3">
				<CalenderComp />
				<ul className="space-y-3 mt-4">
					{Array.from({ length: 25 }).map((_, index) => (
						<Rows key={index} data={""} />
					))}
				</ul>
			</aside>
		</div>
	);
}

export default TherapistHomePage;
