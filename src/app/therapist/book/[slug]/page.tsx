"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { handleClick } from "@/components/ui/magic-ui/Confetti";
import Review from "./components/Review";
import ApiService from "@/helper/ApiService";
import Loading from "@/app/loading";
import DialogComp from "@/components/DialogComp";
import AppointmentForm from "@/components/forms/Appointment";
import { notFound } from "next/navigation";
const apiService = new ApiService("/api/therapist/search/");

function BookingPage({ params }: { params: { slug: string } }) {
	const [loading, setLoading] = useState(true);
	const [disable, setDisable] = useState(true);
	const [error, setError] = useState(false);
	const [user, setuser] = useState<TherapistBooking>();
	useEffect(() => {
		const fetch = async () => {
			setLoading(true);
			const res = await apiService.get<TherapistBooking>({
				endpoint: `?id=${params.slug}`,
			});
			setLoading(false);
			if (res.data) {
				setuser(res.data);
			}
			if (res.error) {
				setError(true);
			}
		};
		fetch();
		return () => {};
	}, []);

	if (loading) {
		return <Loading />;
	}
	if (error) {
		notFound();
	}
	return (
		<div className="text-foreground p-8 pt-24  font-lexend-exa bg-background">
			<div className="flex justify-between">
				<div className=" flex items-center gap-4">
					<div className="w-80 h-80">
						<Image
							src={user?.image || "/doc1.png"}
							alt="doc1"
							width={400}
							height={500}
							className="w-full h-full object-cover object-top rounded-3xl"
						/>
					</div>
					<div className="">
						<h1 className="text-5xl flex items-end flex-wrap tracking-tighter">
							{user?.name}{" "}
							<p className="text-sm tracking-normal">{user?.timing}</p>
						</h1>
						<p className=" pl-1">{user?.speciality}</p>
						<p className=" pl-1">{user?.rating || 5} ⭐</p>
						<div className="mt-3 flex gap-2 ml-1">
							<DialogComp
								content={
									<AppointmentForm
										charges={user?.charges || 0}
										id={user?._id || ""}
									/>
								}
								title="Book Appointment"
							>
								<button className="bg-[#95d4ce] hover:bg-[#5aaaa2] px-4 py-2 rounded-lg">
									Book
								</button>
							</DialogComp>
							<button
								className="border-2 border-[#95d4ce] px-4 py-2 rounded-lg"
								onClick={() => window.history.back()}
							>
								Go Back
							</button>
						</div>
					</div>
				</div>
			</div>
			<Review />
		</div>
	);
}

export default BookingPage;
