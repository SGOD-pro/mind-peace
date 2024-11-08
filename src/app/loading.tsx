"use client	"
import React from "react";
import Loder from "@/components/layout/Loder";
function Loading() {
	return (
		<div className="fixed top-0 left-0 z-[10000] w-screen h-dvh grid place-items-center bg-black/90">
			<Loder />
		</div>
	);
}

export default Loading;
