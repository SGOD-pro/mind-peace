import React from "react";
import {
	Phone,
	LocateFixed,
	IndianRupee,
	BriefcaseMedical,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { AvatarFallback } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
function DoctorCard({ user,onclickFunction }: { user: Therapists,onclickFunction:(user:Therapists)=>void }) {
	return (
		<div className="border rounded-lg p-3 overflow-hidden flex flex-col items-center cursor-pointer hover:bg-muted/50 transition-colors" onClick={()=>onclickFunction(user)}>
			<div className="w-full h-auto max-h-96 rounded-lg overflow-hidden">
				{user.image ? (
					<Image
						src={user.image}
						alt="doc1"
						width={400}
						height={500}
						className="w-full h-full object-cover object-top rounded-md"
					></Image>
				) : (
					<AvatarFallback>
						<UserRound />
					</AvatarFallback>
				)}
			</div>
			<div className="mt-4 font-lexend mx-auto">
				<h3 className="md:text-3xl text-xl md:text-center capitalize">{user.name}</h3>
				<div className="text-muted-foreground flex gap-4 py-2">
					<div className="space-y-1">
						<p className="text-sm leading-tight flex items-center">
							<BriefcaseMedical size={20}/>
							<span className="ml-1">{user.speciality}</span>
						</p>
						<p className="text-sm leading-tight flex items-center">
							<IndianRupee size={20}/>
							<span className="ml-1">{user.charges}</span>
						</p>
					</div>
					<Separator orientation="vertical" className="h-12" />
					<div className="space-y-1">
						<p className="text-sm leading-tight flex items-center">
							<Phone size={20}/>
							<Link href={`"tel:+91 ${user.contactNo}"`}>
								<span className="ml-1 underline">+91 {user.contactNo}</span>
							</Link>
						</p>
						<p className="text-sm leading-tight flex items-center">
							<LocateFixed size={20}/>
							<span className="ml-1 capitalize">{user.clinicLocation}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DoctorCard;
