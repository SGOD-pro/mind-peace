"use client	"
import React from "react";
import Loder from "@/components/layout/Loder";
function Loading() {
	return (
		<div className="fixed top-0 left-0 z-[10000] inset-0 bg-black/20">
			<Loder />
		</div>
	);
}

export default Loading;
