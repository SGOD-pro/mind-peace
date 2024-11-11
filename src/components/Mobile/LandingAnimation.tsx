"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import React, { useRef } from "react";

function LandingAnimation() {
	const yellowScreen = useRef<HTMLDivElement>(null);
	const main = useRef<HTMLDivElement>(null);
	const mainImg = useRef<HTMLImageElement>(null);
	const welcome = useRef<HTMLHeadingElement>(null);
	useGSAP(() => {
		gsap.set(yellowScreen.current, {
			height: "90%",
		});
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
				y: "-110%",
				ease: "power2",
				duration: 0.6,
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
				scale: 3,
				opacity: 0,
				ease: "power2",
				onComplete: () => {
					t1.set(mainImg.current, { display: "none" });
				},
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
		<div className="fixed inset-0 z-[9999] h-dvh" ref={main}>
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
			<div className="absolute top-10 flex justify-center w-full z-10">
				<h3
					className="text-5xl text-center font-lexend-deca tracking-tighter font-medium text-[#65EBA9]"
					ref={welcome}
				>
					Welcome to Mind Peace
				</h3>
			</div>
		</div>
	);
}

export default LandingAnimation;
