"use client";
import ExpandableCardDemo from "@/components/Section3";
import Section4 from "@/components/Section4";

import { useEffect, useRef } from "react";
// import LocomotiveScroll from "locomotive-scroll";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import LocomotiveScroll from "locomotive-scroll";
import LastSection from "@/components/LastSection";
import Link from "next/link";
import LandingAnimation from "@/components/LandingAnimation";

export default function Home() {
	const locomotive = new LocomotiveScroll();
	return (
		<main className="bg-[#F9F9F9] scrollbar relative">
			{/* <LandingAnimation/> */}
			<section
				className="flex h-dvh w-full items-center font-leagueSpartan"
				data-scroll
			>
				<Section1 />
			</section>

			<section className="w-full min-h-dvh h-dvh p-8 pb-12 pt-0 sticky top-2 z-0">
				<Section2 />
			</section>
			<div className="relative">
				<section className="h-[60dvh] bg-[#5A191F] p-10 relative z-10">
					<div className="w-full h-full relative">
						<div
							className="absolute text-white top-0 left-0"
							data-scroll
							data-scroll-speed={(Math.random() * 0.08).toString()}
							data-scroll-direction="horizontal"
						>
							<p className="border-2 uppercase px-3 py-1 rounded-full">
								Caring is always free
							</p>
						</div>
					</div>
				</section>

				<section className="p-8 bg-[#F8E6E4]">
					<ExpandableCardDemo />
				</section>

				<section className="p-8 bg-[#F8E6E4]">
					<Section4 />
				</section>

				<section className="">
					<LastSection />
				</section>

				<footer className="p-4 text-center bg-[#0C023A]">
					<p className="text-[#6F61F4] font-leagueSpartan font-bold text-xl tracking-widest">
						This website is created by{" "}
						<Link href="https://github.com/AnirudhH">Souvik Karmakar </Link>
						with love.
					</p>
				</footer>


			</div>
		</main>
	);
}
