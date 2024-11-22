"use client";
import RatingComponent from "@/components/forms/RatingStar";
import Image from "next/image";
import React from "react";

function FeedbackPage() {
	return (
		<>
			<ul className="my-4 grid grid-cols-4 px-3 py-2 border-b">
				<li className="">Therapist</li>
				<li className="">Paitent Name</li>
				<li className="">Rating</li>
				<li className="">Comment</li>
			</ul>
			<ul className="font-lexend">
				<li className="w-full bg-muted/70 rounded-xl p-3 grid grid-cols-4 items-center">
					<div className="flex gap-3 items-center">
						<div className="w-14 h-14">
							<Image
								src={
									"https://firebasestorage.googleapis.com/v0/b/academid-ledger.appspot.com/o/therapistImages%2F467426283_18087202945512866_2826190988480589123_n.jpg?alt=media&token=0a9f29eb-c2dd-4413-8b2b-3b9c2d96e7a8"
								}
								alt="s"
								width={100}
								height={100}
								className="w-full h-full object-cover rounded-full"
							/>
						</div>
						<h3 className=" text-xl">
							Dr. <span className="">Animika mondal</span>
						</h3>
					</div>
					<h2 className="">Souvik karmakar</h2>
                    <RatingComponent id="1"/>
				</li>
			</ul>
		</>
	);
}

export default FeedbackPage;
