"use client";
import Image from "next/image";
import React from "react";
import { handleClick } from "@/components/ui/magic-ui/Confetti";
import Review from "./components/Review";

function BookingPage({ params }: { params: { slug: string } }) {
	return (
		<div className="text-black p-8 pt-24  font-lexend-exa bg-background">
			<div className="flex justify-between">
				<div className=" flex items-center">
					<div className="w-96 h-96">
						<Image
							src={"/doc1.png"}
							alt="doc1"
							width={400}
							height={500}
						></Image>
					</div>
					<div className="">
						<h1 className="text-5xl flex items-end flex-wrap tracking-tighter">
							Souvik karmakar{" "}
							<p className="text-sm tracking-normal">Sunday,Monday(10:00- 12:00)</p>
						</h1>
						<p className=" pl-1">Specilist</p>
						<p className=" pl-1">4.0 ⭐</p>
						<div className="mt-3 flex gap-2 ml-1">
							<button
								className="bg-[#95d4ce] hover:bg-[#5aaaa2] px-4 py-2 rounded-lg"
								onClick={(e) => handleClick(e)}
							>
								PAY 6000
							</button>
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
			<Review/>
		</div>
	);
}

export default BookingPage;
