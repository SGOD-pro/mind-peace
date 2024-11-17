"use client";
import Image from "next/image";
import React from "react";

function NotFound() {
	return (
		<div className="h-dvh overflow-hidden p-8 md:p-16 bg-background">
			<Image
				src={"/not-found.png"}
				width={2000}
				height={2000}
				alt="Not Found"
				className="w-full h-full object-contain"
			/>
			<button
				className="px-5 py-2 m-auto block bg-[#24275B] rounded-lg text-white"
				onClick={() => window.history.back()}
			>
				Back
			</button>
		</div>
	);
}

export default NotFound;
