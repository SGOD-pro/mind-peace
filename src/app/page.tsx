"use client";
const Section1 = lazy(() => import("@/components/Section1"));
const Section2 = lazy(() => import("@/components/Section2"));
import ExpandableCardDemo from "@/components/Section3";
const Section4 = lazy(() => import("@/components/Section4"));
const LastSection = lazy(() => import("@/components/LastSection"));
import LandingAnimation from "@/components/LandingAnimation";
import Carousel from "@/components/Carosel";
import { lazy, Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import LocomotiveScroll from "locomotive-scroll";
import { animationStore } from "@/store/Animation";
// import Section1 from "@/components/Section1";

export default function Home() {
	useEffect(() => {
		const loco = new LocomotiveScroll();
		return () => {
			loco.destroy();
		};
	}, []);

	return (
		<main className="bg-[#F9F9F9] scrollbar relative text-black">
			{!animationStore.landingAnimation && <LandingAnimation />}
			<section className="flex lg:flex-row flex-col lg:h-dvh w-full items-center font-leagueSpartan relative">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<Section1 />
				</Suspense>
			</section>

			<section className="w-full lg:min-h-dvh lg:h-dvh p-3 md:p-8 md:pb-12 pt-0 z-0">
				<Suspense fallback={<Skeleton className="w-full h-full" />}>
					<Section2 />
				</Suspense>
			</section>
			<div className="relative">
				<section className="lg:h-[60dvh] bg-[#5A191F] p-8 relative z-10">
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
						<Carousel />
					</div>
				</section>

				<section className="p-4 md:p-8 bg-[#F8E6E4]">
					<ExpandableCardDemo />
				</section>

				<section className="p-4 md:p-8 bg-[#F8E6E4]">
					<Section4 />
				</section>

				<section className="">
					<LastSection />
				</section>
			</div>
		</main>
	);
}
