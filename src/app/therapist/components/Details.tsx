import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import Image from "next/image";
import {
	Phone,
	MapPin,
	IndianRupee,
	BriefcaseMedical,
	UserRoundCheck,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import ApiService from "@/helper/ApiService";

const apiService = new ApiService("/api/therapist/details");

function Details({ id }: { id: string }) {
	const [user, setUser] = useState<Therapists | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetch() {
			setLoading(true);
			const res = await apiService.get<Therapists>({
				endpoint: `?id=${id}`,
				showErrorToast: true,
				showSuccessToast: false,
			});
			res.data && setUser(res.data);
			setLoading(false);
		}
		fetch();
	}, [id]);

	return (
		<div className="flex items-center justify-between p-5">
			<div className="flex gap-4">
				<div className="w-72 h-72 rounded-lg overflow-hidden">
					{loading ? (
						<Skeleton className="bg-[#56ecda] w-full h-full" />
					) : (
						<Image
							src={user?.image || "/doc1.png"}
							width={400}
							height={400}
							alt="Doc"
							className="w-full h-full object-cover object-top"
						/>
					)}
				</div>
				<div className="m-2 ">
					<h2 className="text-5xl font-lexend leading-none">
						{loading ? (
							<Skeleton className="bg-[#69e7d8] h-8 w-48" />
						) : (
							<>
								{user?.name}{" "}
								<span className="text-base">
									{"("}
									{user?.qualification}
									{")"}
								</span>
							</>
						)}
					</h2>
					<p className="opacity-70">
						{loading ? (
							<Skeleton className="bg-[#69e7d8] h-5 w-40 mt-2" />
						) : (
							user?.email
						)}
					</p>
					<div className="mt-4 text-lg space-y-1 font-lexend-exa">
						{loading ? (
							<>
								<Skeleton className="bg-[#69e7d8] h-5 w-32" />
								<Skeleton className="bg-[#69e7d8] h-5 w-32" />
								<Skeleton className="bg-[#69e7d8] h-5 w-32" />
								<Skeleton className="bg-[#69e7d8] h-5 w-32" />
								<Skeleton className="bg-[#69e7d8] h-5 w-32" />
							</>
						) : (
							<>
								<p className="flex items-center">
									<UserRoundCheck />
									{user?.speciality}
								</p>
								<p className="flex items-center">
									<Phone />
									<Link href={`tel:+91${user?.contactNo}`} className="">
										{user?.contactNo}
									</Link>
								</p>
								<p className="flex items-center">
									<MapPin />
									<span className=" capitalize">{user?.clinicLocation}</span>
								</p>
								<p className="flex items-center">
									<BriefcaseMedical />
									<span className="">{user?.experience} Y</span>
								</p>
								<p className="flex items-center">
									<IndianRupee />
									<span className="">{user?.charges}</span>
								</p>
							</>
						)}
					</div>
				</div>
			</div>

			<DrawerFooter>
				{loading ? (
					<Skeleton className="bg-[#69e7d8] h-10 w-20 rounded-md" />
				) : (
					<Link
						href={`/therapist/book/${id}`}
						className="bg-blue-600 rounded-md px-4 py-2 text-white"
					>
						Book
					</Link>
				)}
				<DrawerClose className="mt-1">
					<Button variant={"ghost"}>Cancel</Button>
				</DrawerClose>
			</DrawerFooter>
		</div>
	);
}

export default Details;
