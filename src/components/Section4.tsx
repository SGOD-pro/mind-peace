"use client";
import Image from "next/image";
import React, { useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import ExpandableCard from "./ExpandableCard";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

function Section4() {
	gsap.registerPlugin(ScrollTrigger);
	const [active, setActive] = useState<boolean | null | CardProps>(null);
	const id = useId();
	const parent = useRef<HTMLDivElement | null>(null);
	useGSAP(() => {
		if (!parent.current) return;
		const childs: HTMLDivElement[] = gsap.utils.toArray(
			parent.current.children
		);
		childs.forEach((child) => {
			gsap.from(child, {
				opacity: 0,
				y: 100,
				duration: 0.5,

				scrollTrigger: {
					trigger: child,
					start: "top 80%",
					toggleActions: "play reverse play reverse",
					// markers: true,
				},
			});
		});
	}, []);
	return (
		<>
			<ExpandableCard active={active} onClose={() => setActive(null)} id={id} />

			<div className="mx-auto w-[95%]">
				<div className="" data-scroll data-scroll-speed=".1">
					<span className="md:text-xl font-lexend-exa uppercase tracking-wider border-2 rounded-full border-black px-4 py-2">
						practices
					</span>
				</div>
				<h2
					className="text-5xl md:text-6xl font-lexend-decad md:w-[440px] leading-[3rem] mt-8"
					data-scroll
					data-scroll-speed=".06"
				>
					Exercies based on{" "}
					<span className="leading-[3rem] font-semibold">your need</span>
				</h2>
				<div
					className="max-w-7xl m-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4"
					ref={parent}
				>
					{cards.map((card, index) => (
						<div className="" key={index}>
							<motion.div
								className={`w-full h-full relative overflow-hidden rounded-2xl shadow-custom hover:shadow-none transition-all hover:scale-[.99] cursor-pointer`}
								onClick={() => setActive(cards[index])}
								layoutId={`card-${card.title}-${id}`}
								style={{ backgroundColor: card.bgColor }}
							>
								<h4 className="absolute leading-none top-3 left-3 text-3xl font-lexend w-full z-10">
									{" "}
									{card.title}
								</h4>
								<div
									className=""
									data-scroll
									data-scroll-speed={(Math.random() * 0.08).toString()}
								>
									<Image
										src={card.src}
										alt="music"
										width={400}
										height={400}
										className="w-full h-full object-contain object-top"
									></Image>
								</div>
							</motion.div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Section4;

const cards: CardProps[] = [
	{
		title: "Regular Physical Activity",
		src: "/music.png",
		description: "Boosts energy and mood",
		bgColor: "#FF96FD",
		content: () => (
			<p>
				Engage in regular exercise, such as walking, running, or dancing, to
				improve your physical and mental health. It helps to relieve stress,
				boosts energy, and enhances overall mood.
			</p>
		),
	},
	{
		title: "Gardening",
		src: "/gardening.jpg",
		description: "Relaxes mind and body",
		bgColor: "#e9efb1",
		content: () => (
			<p>
				Spend time in your garden planting, watering, or simply being around
				greenery. Gardening is a therapeutic activity that can help reduce
				anxiety, promote relaxation, and connect you with nature.
			</p>
		),
	},
	{
		title: "Connect with Others",
		src: "/withother.jpg",
		description: "Strengthens social bonds",
		bgColor: "#FFA990",
		content: () => (
			<p>
				Make time to connect with friends, family, or communities. Social
				interactions can uplift your mood, reduce feelings of loneliness, and
				help you gain new perspectives on life.
			</p>
		),
	},
	{
		title: "Limit Caffeine and Sugar",
		src: "/coffee.png",
		description: "Reduces anxiety levels",
		bgColor: "#E07741",
		content: () => (
			<p>
				Reducing your intake of caffeine and sugary drinks can help stabilize
				your mood and prevent anxiety. Opt for healthier alternatives like
				herbal teas and natural juices.
			</p>
		),
	},
	{
		title: "Practice Deep Breathing",
		src: "/breething.jpg",
		description: "Calms the nervous system",
		bgColor: "#FEF3B5",
		content: () => (
			<p>
				Deep breathing exercises can lower stress, calm your mind, and improve
				focus. Practice techniques such as 4-7-8 breathing to relax your body
				and relieve tension.
			</p>
		),
	},
	{
		title: "Creative Works",
		src: "/art.png",
		description: "Encourages self-expression",
		bgColor: "#E8FFAF",
		content: () => (
			<p>
				Engage in creative activities like painting, drawing, or writing. These
				practices allow you to express yourself, explore your imagination, and
				can be therapeutic for your mental well-being.
			</p>
		),
	},
];
