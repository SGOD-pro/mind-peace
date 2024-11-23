"use client";
import React, { useEffect, useRef } from "react";
import Section1 from "./components/Section1";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AllSection from "./components/AllTherapistSection";
import LocomotiveScroll from "locomotive-scroll";
import TopRatedCards from "./components/TopRatedCards";
import FetchTherapist from "@/hooks/FetchTherapist";

function TherapistPage() {
	gsap.registerPlugin(ScrollTrigger);
	const topRatedContainer = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		if (!topRatedContainer.current) {
			return;
		}
		const childrens = gsap.utils.toArray(topRatedContainer.current.children);
		gsap.from(childrens, {
			opacity: 0,
			x: 100,
			stagger: 0.2,
			scrollTrigger: {
				trigger: topRatedContainer.current,
				start: "top 70%",
				// markers: true,
				toggleActions: "play reverse play reverse",
			},
		});
	}, []);
	useEffect(() => {
		const loco = new LocomotiveScroll();
		return () => {
			loco.destroy();
		};
	}, []);

	return (
		<>
			<main className="p-4 pt-0 lg:p-8 lg:pt-0 bg-[#EBFFFD] text-black">
				<Section1 />
				<section className="py-10">
					<h2 className="text-4xl font-lexend tracking-tighter">Top rated</h2>
					<div
						className="p-3 flex gap-5 overflow-x-auto flex-nowrap [scrollbar-width:none] "
						ref={topRatedContainer}
					>
						<TopRatedCards
							name="Modhumita sen"
							speciality="Neoropsych"
							image="/doc/doc5.png"
							rating={4.0}
						/>
						<TopRatedCards
							name="Modhumita sen"
							speciality="Neoropsych"
							image="/doc/doc2.png"
							rating={4.0}
						/>
						<TopRatedCards
							name="Modhumita sen"
							speciality="Neoropsych"
							image="/doc/doc3.png"
							rating={4.0}
						/>
						<TopRatedCards
							name="Modhumita sen"
							speciality="Neoropsych"
							image="/doc/doc4.png"
							rating={4.0}
						/>
					</div>
				</section>
				<FetchTherapist>
					<AllSection />
				</FetchTherapist>
			</main>
		</>
	);
}

export default TherapistPage;
