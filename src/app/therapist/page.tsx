"use client";
import React, { useRef } from "react";
import Section1 from "./components/Section1";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Input } from "@/components/ui/input";

function TherapistPage() {
	gsap.registerPlugin(ScrollTrigger);
	const topRatedContainer = useRef<HTMLDivElement>(null);
	const showTherapistContainer = useRef<HTMLDivElement>(null);
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
	useGSAP(() => {
		if (!showTherapistContainer.current) {
			return;
		}
		const childrens: HTMLDivElement[] = gsap.utils.toArray(
			showTherapistContainer.current.children
		);
		console.log(childrens);
		childrens.forEach((child) => {
			gsap.from(child, {
				opacity: 0,
				duration:.4,
				y: 50,
				scrollTrigger: {
					trigger: child,
					start: "top 80%",
					end: "top 80%",
					// markers: true,
				},
			});
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
				<section className="">
					<h2 className="text-4xl font-lexend tracking-tighter">
						All therapists
					</h2>
					<nav className="flex mx-auto w-[90%] justify-end items-center">
						<ul className="flex gap-4 flex-nowrap">
							<li className=" flex-shrink-0">
								<button className="therapist-filters">All</button>
							</li>
							<li className=" flex-shrink-0">
								<button className="therapist-filters">Psychiatrist</button>
							</li>
							<li>
								<button className=" therapist-filters">Psychologist</button>
							</li>
							<li>
								<button className="therapist-filters">Neuropsych</button>
							</li>
							<li>
								<button className="therapist-filters">Family Therapist</button>
							</li>
							<li>
								<button className="therapist-filters">Psychiatrist</button>
							</li>
						</ul>
						<Input className="w-[240px] ml-3" placeholder="Search.."></Input>
					</nav>
					<div className="max-w-7xl m-auto mt-7">
						<div
							className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
							ref={showTherapistContainer}
						>
							<div className="relative rounded-lg shadow shadow-black/50 hover:scale-105  hover:shadow-md p-3">
								<div className="rounded-full overflow-hidden border w-44 h-44 p-2 m-auto border-blue-500">
									<Image
										src={"/doc/doc1.png"}
										alt="doc1"
										width={400}
										height={500}
										className="w-full h-full object-cover object-top rounded-full"
									></Image>{" "}
								</div>

								<h2 className="text-3xl font-lexend">
									Dr.<span className="">Sarmila sen</span>
								</h2>
								<p className="">Psychiatrist</p>
								<div className="text-right">
									<button className=" px-4 py-2 rounded-md bg-blue-500 text-white bottom-2 right-2">
										View Profile
									</button>
								</div>
							</div>
							<div className="relative rounded-lg shadow shadow-black/50 hover:scale-105   hover:shadow-md p-3">
								<div className="rounded-full overflow-hidden border w-44 h-44 p-2 m-auto border-blue-500">
									<Image
										src={"/doc/doc3.png"}
										alt="doc1"
										width={400}
										height={500}
										className="w-full h-full object-cover object-top rounded-full"
									></Image>{" "}
								</div>

								<h2 className="text-3xl font-lexend">
									Dr.<span className="">Sarmila sen</span>
								</h2>
								<p className="">Psychiatrist</p>
								<div className="text-right">
									<button className=" px-4 py-2 rounded-md bg-blue-500 text-white bottom-2 right-2">
										View Profile
									</button>
								</div>
							</div>
							<div className="relative rounded-lg shadow shadow-black/50 hover:scale-105   hover:shadow-md p-3">
								<div className="rounded-full overflow-hidden border w-44 h-44 p-2 m-auto border-blue-500">
									<Image
										src={"/doc/doc4.png"}
										alt="doc1"
										width={400}
										height={500}
										className="w-full h-full object-cover object-top rounded-full"
									></Image>{" "}
								</div>

								<h2 className="text-3xl font-lexend">
									Dr.<span className="">Sarmila sen</span>
								</h2>
								<p className="">Psychiatrist</p>
								<div className="text-right">
									<button className=" px-4 py-2 rounded-md bg-blue-500 text-white bottom-2 right-2">
										View Profile
									</button>
								</div>
							</div>
							<div className="relative rounded-lg shadow shadow-black/50 hover:scale-105   hover:shadow-md p-3">
								<div className="rounded-full overflow-hidden border w-44 h-44 p-2 m-auto border-blue-500">
									<Image
										src={"/doc/doc5.png"}
										alt="doc1"
										width={400}
										height={500}
										className="w-full h-full object-cover object-top rounded-full"
									></Image>{" "}
								</div>

								<h2 className="text-3xl font-lexend">
									Dr.<span className="">Sarmila sen</span>
								</h2>
								<p className="">Psychiatrist</p>
								<div className="text-right">
									<button className=" px-4 py-2 rounded-md bg-blue-500 text-white bottom-2 right-2">
										View Profile
									</button>
								</div>
							</div>
							<div className="relative rounded-lg shadow shadow-black/50 hover:scale-105   hover:shadow-md p-3">
								<div className="rounded-full overflow-hidden border w-44 h-44 p-2 m-auto border-blue-500">
									<Image
										src={"/doc/doc6.png"}
										alt="doc1"
										width={400}
										height={500}
										className="w-full h-full object-cover object-top rounded-full"
									></Image>{" "}
								</div>

								<h2 className="text-3xl font-lexend">
									Dr.<span className="">Sarmila sen</span>
								</h2>
								<p className="">Psychiatrist</p>
								<div className="text-right">
									<button className=" px-4 py-2 rounded-md bg-blue-500 text-white bottom-2 right-2">
										View Profile
									</button>
								</div>
							</div>
							<div className="relative rounded-lg shadow shadow-black/50 hover:scale-105   hover:shadow-md p-3">
								<div className="rounded-full overflow-hidden border w-44 h-44 p-2 m-auto border-blue-500">
									<Image
										src={"/doc/doc2.png"}
										alt="doc1"
										width={400}
										height={500}
										className="w-full h-full object-cover object-top rounded-full"
									></Image>{" "}
								</div>

								<h2 className="text-3xl font-lexend">
									Dr.<span className="">Sarmila sen</span>
								</h2>
								<p className="">Psychiatrist</p>
								<div className="text-right">
									<button className=" px-4 py-2 rounded-md bg-blue-500 text-white bottom-2 right-2">
										View Profile
									</button>
								</div>
							</div>
							<div className="relative rounded-lg shadow shadow-black/50 hover:scale-105   hover:shadow-md p-3">
								<div className="rounded-full overflow-hidden border w-44 h-44 p-2 m-auto border-blue-500">
									<Image
										src={"/doc/doc7.png"}
										alt="doc1"
										width={400}
										height={500}
										className="w-full h-full object-cover object-top rounded-full"
									></Image>{" "}
								</div>

								<h2 className="text-3xl font-lexend">
									Dr.<span className="">Sarmila sen</span>
								</h2>
								<p className="">Psychiatrist</p>
								<div className="text-right">
									<button className=" px-4 py-2 rounded-md bg-blue-500 text-white bottom-2 right-2">
										View Profile
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default TherapistPage;
