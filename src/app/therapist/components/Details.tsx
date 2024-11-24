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
import useAuthStore from "@/store/Auth";
import { useLoginForm } from "@/store/LoginForm";

const apiService = new ApiService("/api/therapist/details");

function Details({ id }: { id: string }) {
	const { user } = useAuthStore();
	const setIsOpen = useLoginForm((state) => state.setIsOpen);

	const [therapist, setUser] = useState<Therapists | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetch() {
			setLoading(true);
			const res = await apiService.get<Therapists>({
				endpoint: `?id=${id}`,
				showErrorToast: true,
				showSuccessToast: false,
			});
			if (res.data) {
				setUser(res.data);
			}
			setLoading(false);
		}
		fetch();
	}, [id]);

	return (
		<div className="p-3 sm:p-5">
			<div className="flex gap-4 flex-col sm:flex-row">
				<div className="w-56 h-56 sm:w-72 sm:h-72 rounded-lg overflow-hidden m-auto sm:m-0">
					{loading ? (
						<Skeleton className="bg-[#56ecda] w-full h-full" />
					) : (
						<Image
							src={therapist?.image || "/doc1.png"}
							width={400}
							height={400}
							alt="Doc"
							className="w-full h-full object-cover object-top"
						/>
					)}
				</div>
				<div className="flex justify-between sm:w-[calc(100%-18rem)] relative sm:flex-row flex-col">
					<div className="m-2">
						<h2 className="text-3xl lg:text-5xl font-lexend leading-none flex sm:items-end sm:flex-row flex-col">
							{loading ? (
								<Skeleton className="bg-[#69e7d8] h-8 w-48" />
							) : (
								<>
									{therapist?.name}{" "}
									<span className="text-xs lg:text-base">
										{"("}
										{therapist?.qualification}
										{")"}
									</span>
								</>
							)}
						</h2>
						<p className="opacity-70">
							{loading ? (
								<Skeleton className="bg-[#69e7d8] h-5 w-40 mt-2 text-xs lg:text-base" />
							) : (
								therapist?.email
							)}
						</p>
						<div className="mt-4 text-sm lg:text-lg space-y-1 font-lexend-exa flex flex-wrap lg:block gap-x-3">
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
									<p className="flex items-center gap-2">
										<UserRoundCheck className="w-5 h-5"/>
										{therapist?.speciality}
									</p>
									<p className="flex items-center gap-2">
										<Phone className="w-5 h-5"/>
										<Link href={`tel:+91${therapist?.contactNo}`} className="">
											{therapist?.contactNo}
										</Link>
									</p>
									<p className="flex items-center gap-2">
										<MapPin className="w-5 h-5"/>
										<span className=" capitalize">
											{therapist?.clinicLocation}
										</span>
									</p>
									<p className="flex items-center gap-2">
										<BriefcaseMedical className="w-5 h-5"/>
										<span className="">{therapist?.experience} Y</span>
									</p>
									<p className="flex items-center gap-2">
										<IndianRupee className="w-5 h-5"/>
										<span className="">{therapist?.charges}</span>
									</p>
								</>
							)}
						</div>
					</div>
					<DrawerFooter className=" flex flex-row sm:flex-col gap-2 p-0">
						<div className="flex-grow">
							{loading ? (
								<Skeleton className="bg-[#69e7d8] h-10 w-20 rounded-md" />
							) : !user ? (
								<button
									className="bg-blue-600 w-full rounded-md px-4 py-1.5 text-white text-center login-btn"
									onClick={() => setIsOpen(true)}
								>
									Login
								</button>
							) : (
								<Link
									href={`/therapist/book/${id}`}
									className="bg-blue-600 rounded-md px-4 py-1.5 text-white text-center"
								>
									Book
								</Link>
							)}
						</div>
						<DrawerClose className="flex-grow">
							<Button className="w-full" variant={"ghost"}>Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</div>
		</div>
	);
}

export default Details;
