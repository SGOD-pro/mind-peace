"use client";
import AllTherapistTable from "@/app/dashboard/admin/components/AllDoctors";
import { Button } from "@/components/ui/button";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";

import AddTherapistForm from "@/components/forms/AddTherapistForm";

function Admin() {
	return (
		<div className="flex flex-1 flex-col gap-4">
			<div className="grid auto-rows-min gap-4 md:grid-cols-3 font-lexend-deca">
				<div className="rounded-xl bg-muted/50 p-3 relative">
					<h2 className="text-4xl">Therapists</h2>
					<p className="font-lexend-exa text-7xl text-center text-orange-500">
						07
					</p>
					<div className="w-full text-right">
						<span className=" text-sm right-3 bottom-1 text-muted-foreground">
							in last 70 days
						</span>
					</div>
				</div>
				<div className="rounded-xl bg-muted/50 p-3 relative">
					<h2 className="text-4xl">Profit</h2>
					<p className="font-lexend-exa text-7xl text-center text-blue-500">
						07
					</p>
					<div className="w-full text-right">
						<span className=" text-sm right-3 bottom-1 text-muted-foreground">
							in last 70 days
						</span>
					</div>
				</div>
				<div className="rounded-xl bg-muted/50 p-3 relative">
					<h2 className="text-4xl">Reviews</h2>
					<p className="font-lexend-exa text-7xl text-center text-lime-500">
						07
					</p>
					<div className="w-full text-right">
						<span className=" text-sm right-3 bottom-1 text-muted-foreground">
							in last 70 days
						</span>
					</div>
				</div>
			</div>
			<div className="flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
				<div className="text-right">
					<Dialog>
						<DialogTrigger>
							<Button>
								Add new <CirclePlus />
							</Button>
						</DialogTrigger>
						<DialogContent className="">
							<DialogHeader>
								<DialogTitle>Add new therapist</DialogTitle>
							</DialogHeader>
							<AddTherapistForm />
						</DialogContent>
					</Dialog>
				</div>
				<div className=" border rounded-lg mt-4">
					<AllTherapistTable />
				</div>
			</div>
		</div>
	);
}

export default Admin;
