"use client";
import ExpandableCardDemo from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import LastSection from "@/components/LastSection";
import LandingAnimation from "@/components/LandingAnimation";
import Carousel from "@/components/Carosel";
import Loading from "./loading";

export default function Home() {

	return (
		<main className="bg-[#F9F9F9] scrollbar relative text-black">
			{/* <LandingAnimation/> */}
			<section
				className="flex h-dvh w-full items-center font-leagueSpartan"
			>
				<Section1 />
			</section>

			<section className="w-full min-h-dvh h-dvh p-8 pb-12 pt-0 z-0">
				<Section2 />
			</section>
			<div className="relative">
				<section className="h-[60dvh] bg-[#5A191F] p-8 relative z-10">
					<div className="w-full h-full relative">
						<div
							className="absolute text-white top-0 left-0"
							data-scroll
							data-scroll-speed={(Math.random() * 0.08).toString()}
							data-scroll-direction="horizontal"
						>
							<p className="border-2 uppercase px-3 py-1 rounded-full border-[#f4f4f4]">
								Caring is always free
							</p>
						</div>
						<Carousel/>
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

			


			</div>
		</main>
	);
}
