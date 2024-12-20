"use client"
import Image from "next/image";
import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import ContactForm from "./forms/ContactUs";
function LastSection() {
	return (
		<div className="w-full h-[60dvh] md:h-dvh  relative">
			<div className="absolute inset-0 bg-black top-0 left-0">
				<Image
					src={"/last.jpg"}
					alt="lastsection"
					className="w-full h-full object-cover"
					width={1920}
					height={1080}
				></Image>
			</div>
			<div className="absolute flex justify-center top-5 sm:top-20 w-full">
				<h2
					className="text-4xl md:text-5xl leading-none text-center md:w-1/2 text-[#5747E6] font-lexend-exa  z-10"
					data-scroll
					data-scroll-speed=".05"
				>
					Feel free to tweak it as needed!
				</h2>
			</div>
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
				<Dialog>
					<DialogTrigger
						className="rounded-full px-6 text-xl py-2 text-[#5747E6] bg-[#5747E6]/10 backdrop-blur shadow-md shadow-black/20 hover:shadow-none transition-all"
						data-scroll
						data-scroll-speed=".02"
					>
						Query us
					</DialogTrigger>
					<DialogContent className="bg-[#140756]/50 backdrop-blur">
						<DialogHeader>
							<DialogTitle className="text-white">
								Is there anything you would like to ask us?
							</DialogTitle>
						</DialogHeader>
						<ContactForm />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}

export default LastSection;
