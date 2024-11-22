"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
	Calendar,
	Clock,
	Mail,
	BriefcaseBusiness,
	GraduationCap,
	UserRound,
} from "lucide-react";

import Image from "next/image";
import Appointment from "@/components/forms/Appointment";

import { AvatarFallback, Avatar } from "@/components/ui/avatar";
function DrawerComponent({
	open,
	user,
	setOpen,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	user: Therapists | null;
}) {
	if (!user) {
		return null;
	}
	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogContent className="lg:w-[70vw] lg:max-w-fit">
				<div className="flex gap-5">
					<div className="">
						<div className="w-[16rem] h-72 rounded-lg overflow-hidden">
							{user?.image ? (
								<Image
									src={user?.image}
									alt="doc1"
									width={400}
									height={500}
									className="w-full h-full object-cover object-top rounded-md"
								></Image>
							) : (
								<Avatar>
									<AvatarFallback>
										<UserRound />
									</AvatarFallback>
								</Avatar>
							)}
						</div>
						<div className="mt-4">
							<h2 className="text-3xl font-lexend">{user?.name}</h2>
							<div className="text-muted-foreground text-sm mt-3 space-y-1">
								<p className="flex gap-3 items-center">
									<Calendar size={20} />
									<span>{user?.days.join(", ")}</span>
								</p>
								<p className="flex gap-3 items-center">
									<Clock size={20} />
									<span>
										{user?.timing.from} - {user?.timing.to}
									</span>
								</p>
								<p className="flex gap-3 items-center">
									<Mail size={20} />
									<span>{user?.email}</span>
								</p>
								<p className="flex gap-3 items-center">
									<BriefcaseBusiness size={20} />
									<span>{user?.speciality}</span>
								</p>
								<p className="flex gap-3 items-center">
									<GraduationCap size={20} />
									<span>{user?.qualification}</span>
								</p>
							</div>
						</div>
					</div>
					<Separator orientation="vertical" />
					<Appointment charges={user?.charges || 0} id={user?._id || ""} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default DrawerComponent;
