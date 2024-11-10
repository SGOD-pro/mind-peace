"use client";
import Image from "next/image";
import React, { memo } from "react";

const Icon = memo(() => {
	return (
		<div className="w-12 h-12">
			<Image
				src="/logo.png"
				alt="logo"
				width={100}
				height={100}
				className="w-full h-full object-contain"
			/>
		</div>
	);
});

export default Icon;
