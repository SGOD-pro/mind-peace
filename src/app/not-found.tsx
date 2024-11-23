"use client";
import React from "react";
import Image from "next/image";
function NotFound() {
	return (
		<div className="h-dvh overflow-hidden p-8 md:p-16 bg-background">
			<Image
				src={"/not-found.png"}
				property="1"
				alt="Not Found"
				className="w-full h-full object-contain"
				height={2000}
				width={2000}
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
