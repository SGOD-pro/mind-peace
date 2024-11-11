"use client";
import React, { useRef } from "react";
import Section1 from "./components/Section1";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import AllSection from "./components/AllSection";


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
			},
		});
	}, []);


	return (
		<>
			<main className="p-8 pt-0 bg-[#EBFFFD] text-black">
				<Section1 />
				<section className="py-10">
					<h2 className="text-4xl font-lexend tracking-tighter">Top rated</h2>
					<div
						className="p-3 flex gap-5 overflow-x-auto flex-nowrap [scrollbar-width:none] "
						ref={topRatedContainer}
					>
						<div className="w-64  h-96 p-2 top-rated-card rounded-xl flex-shrink-0">
							<div className="h-[70%] overflow-hidden w-full rounded-lg mb-4">
								<Image
									src={"/doc/doc5.png"}
									alt="doc1"
									width={400}
									height={500}
									className="w-full h-full object-cover object-top"
								></Image>
							</div>
							<h4 className="text-xl">
								<span>Dr.</span>Modhumita sen
							</h4>
							<p>Neoropsych</p>
							<span className="absolute text-lg px-3 rounded-md bg-[#f9f9f9] bottom-2 right-2 pr-0">
								4.0 ⭐
							</span>
						</div>
						<div className="w-64  h-96 p-2 top-rated-card rounded-xl flex-shrink-0">
							<div className="h-[70%] overflow-hidden w-full rounded-lg mb-4">
								<Image
									src={"/doc/doc2.png"}
									alt="doc1"
									width={400}
									height={500}
									className="w-full h-full object-cover object-top"
								></Image>
							</div>
							<h4 className="text-xl">
								<span>Dr.</span>Modhumita sen
							</h4>
							<p>Neoropsych</p>
							<span className="absolute text-lg px-3 rounded-md bg-[#f9f9f9] bottom-2 right-2 pr-0">
								4.0 ⭐
							</span>
						</div>
						<div className="w-64  h-96 p-2 top-rated-card rounded-xl flex-shrink-0">
							<div className="h-[70%] overflow-hidden w-full rounded-lg mb-4">
								<Image
									src={"/doc/doc3.png"}
									alt="doc1"
									width={400}
									height={500}
									className="w-full h-full object-cover object-top"
								></Image>
							</div>
							<h4 className="text-xl">
								<span>Dr.</span>Modhumita sen
							</h4>
							<p>Neoropsych</p>
							<span className="absolute text-lg px-3 rounded-md bg-[#f9f9f9] bottom-2 right-2 pr-0">
								4.0 ⭐
							</span>
						</div>
						<div className="w-64  h-96 p-2 top-rated-card rounded-xl flex-shrink-0">
							<div className="h-[70%] overflow-hidden w-full rounded-lg mb-4">
								<Image
									src={"/doc/doc4.png"}
									alt="doc1"
									width={400}
									height={500}
									className="w-full h-full object-cover object-top"
								></Image>
							</div>
							<h4 className="text-xl">
								<span>Dr.</span>Modhumita sen
							</h4>
							<p>Neoropsych</p>
							<span className="absolute text-lg px-3 rounded-md bg-[#f9f9f9] bottom-2 right-2">
								4.0 ⭐
							</span>
						</div>
					</div>
				</section>
				
					<AllSection/>
			</main>
		</>
	);
}

export default TherapistPage;
