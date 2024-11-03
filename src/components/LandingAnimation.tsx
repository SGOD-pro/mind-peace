"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";

function LandingAnimation() {
	const iconContainer = useRef<HTMLDivElement>(null);
	const yellowScreen = useRef<HTMLDivElement>(null);
	const main = useRef<HTMLDivElement>(null);
	const mainImg = useRef<HTMLImageElement>(null);
	const welcome = useRef<HTMLHeadingElement>(null);
	const desc = useRef<HTMLParagraphElement>(null);

	useGSAP(() => {
		if (!iconContainer.current || !mainImg.current) return;
		const icons: HTMLDivElement[] = gsap.utils.toArray(
			iconContainer.current.children
		);
		icons.forEach((icon, index) => {
			const randomXOffset = Math.random() * 50 + 100; // Range: 10-20%
			const randomYOffset = Math.random() * 40 + 20; // Range: 10-20%
			const xPosition = index % 2 === 0 ? randomXOffset : -randomXOffset;
			const yPosition = index < 2 ? randomYOffset : -randomYOffset;

			gsap.to(icon, {
				position: "absolute",
				opacity: 1,
				scale: 1,
				rotation: Math.random() * 20 - 10,
				duration: 0.8,
				ease: "power2.inOut",
				y: `${yPosition}%`,
				x: `${xPosition}%`,
				delay: index * 0.2,
			});
		});
		gsap.set(yellowScreen.current,{
			height: "90%",
		})
		const t1 = gsap.timeline();
		t1.from(
			mainImg.current,
			{
				opacity: 0,
				ease: "expo.out",
				duration: 1.2,
				y: "80%",
			},
			"b"
		);

		t1.from(
			welcome.current,
			{
				opacity: 0,
				y: "110%",
				ease: "power2",
				duration: 0.6,
			},
			"a"
		);
		t1.from(
			desc.current,
			{
				opacity: 0,
				y: "-110%",
				ease: "power2",
				duration: 0.8,
			},
			"a"
		);
		const t2 = gsap.timeline({
			delay: 1.2,
			defaults: {
				duration: 1.2,
			},
		});
		t2.to(
			yellowScreen.current,
			{
				y: "-100%",
				ease: "power2",
			},
			"fadeOut1"
		);
		t2.to(
			mainImg.current,
			{
				scale:3,
				opacity: 0,
				ease: "power2",
				onComplete: () => {
					t1.set(mainImg.current, { display: "none" });
				}
			},
			"fadeOut1"
		);
		t2.to(
			welcome.current,
			{
				opacity: 0,
				y: "110%",
				ease: "power2",
			},
			"fadeOut1"
		);
		t2.to(
			desc.current,
			{
				opacity: 0,
				y: "-110%",
				ease: "power2",
			},
			"fadeOut1"
		);
		t2.to(
			icons,
			{
				scale: 0,
				opacity: 0,
			},
			"fadeOut1"
		);
		t2.to(main.current, {
			y: "-100%",
			display: "none",
			onComplete: () => {
				t1.set(main.current, { display: "none" });
			},
		});
		const masterTimeline = gsap.timeline();
		masterTimeline.add(t1).add(t2, ">");
	}, []);
	return (
		<div className="fixed inset-0 z-[9999] " ref={main}>
			<div
				className="absolute inset-0 h-dvh bg-[#f7e3a6] -z-10 top-0 left-0"
				ref={yellowScreen}
			></div>
			<Image
				src={"/landing.png"}
				alt="landing"
				width={3000}
				ref={mainImg}
				height={2000}
				className="h-full w-full object-cover relative z-0 opacity-1"
			></Image>
			<div className={`"absolute inset-0 left-0 top-0"`} ref={iconContainer}>
				<div className={`absolute top-0 left-0 w-32  h-40 scale-0 opacity-0`}>
					<Image
						src={"/icons/icon4.png"}
						alt="icon"
						width={200}
						height={200}
						className="w-full h-full object-contain hover:scale-95 transition-all"
					/>
				</div>
				<div className={`absolute top-0 right-0 w-32 h-40 scale-0 opacity-0`}>
					<Image
						src={"/icons/icon3.png"}
						alt="icon"
						width={200}
						height={200}
						className="w-full h-full object-contain hover:scale-95 transition-all"
					/>
				</div>
				<div className={`absolute bottom-0 left-0 w-32 h-40 scale-0 opacity-0`}>
					<Image
						src={"/icons/icon2.png"}
						alt="icon"
						width={200}
						height={200}
						className="w-full h-full object-contain hover:scale-95 transition-all"
					/>
				</div>
				<div className={`absolute bottom-0 right-0 w-32 h-40 scale-0 opacity-0`}>
					<Image
						src={"/icons/icon5.png"}
						alt="icon"
						width={200}
						height={200}
						className="w-full h-full object-contain hover:scale-95 transition-all"
					/>
				</div>
			</div>
			<div className="absolute bottom-20 flex justify-center w-full z-10">
				<h3
					className="text-7xl font-lexend-deca  font-medium text-[#65EBA9]"
					ref={welcome}
				>
					Welcome to Mind Peace
				</h3>
			</div>
			<div className="w-full flex justify-center absolute top-20 z-10">
				<p
					className="font-lexend-exa tracking-tight leading-none font-semibold w-2/3 text-center text-3xl text-[#FD7B55]"
					ref={desc}
				>
					Take a deep breath, unwind, and start exploring tools and insights
					that can help you find balance and well-being.
				</p>
			</div>
		</div>
	);
}

export default LandingAnimation;
