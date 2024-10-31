"use client";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
const slides = [
	{ image: "/slide1.jpg", alt: "doc1" },
	{ image: "/slide2.png", alt: "doc1" },
	{ image: "/slide3.jpg", alt: "doc1" },
];
const h1s = [
	"Build Confidence at Any Age",
	"Overcome Fears and Anxieties",
	"Foster Healthy Relationships",
];
const ps = [
	"We help you grow self-assurance, no matter your stage in life, fostering a positive self-image and resilience.",
	"We provide support to help you face and conquer your fears, promoting mental freedom and growth.",
	"Gain tools to build stronger, more fulfilling connections with those around you, based on trust and understanding.",
];
const Carousel = () => {
	const slideContainerRef = useRef(null);
	const slideHeadingRef = useRef(null);
	const slideDecRef = useRef(null);
	const [slideIndex, setSlideIndex] = useState(0);

	useGSAP(() => {
		const slideCount = slides.length;
		const interval = setInterval(() => {
			setSlideIndex((prevIndex) => {
				console.log(prevIndex);
				const newIndex = (prevIndex + 1) % slideCount;

				// Animate the slide change
				gsap.to(slideContainerRef.current, {
					x: `-${100 * newIndex}%`,
					duration: 1,
					ease: "power2.inOut",
				});
				gsap.to(slideHeadingRef.current, {
					y: `-${100 * newIndex}%`,
					duration: 1,
					ease: "power2.inOut",
				});
				gsap.to(slideDecRef.current, {
					y: `-${100 * newIndex}%`,
					duration: 1,
					ease: "power2.inOut",
				});

				return newIndex;
			});
		}, 3000); // Adjust the interval (3000ms = 3 seconds)

		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<div className="flex justify-around w-full h-full gap-4">
			<div className=" flex flex-col justify-center text-[#f9f9f9]">
				<div className="w-2/3">
					<div className="h-[calc(2.75rem*2)] overflow-hidden" data-scroll data-scroll-speed=".02">
						<div className="h-full"  ref={slideHeadingRef}>
							<div className="font-lemon pl-1">
								<h2 className="text-4xl leading-tighter py-1 h-full">
									{h1s[0]}
								</h2>
								<h2 className="text-4xl leading-tighter py-1 h-full">
									{h1s[1]}
								</h2>
								<h2 className="text-4xl leading-tighter py-1 h-full">
									{h1s[2]}
								</h2>
							</div>
						</div>
					</div>
					<div className="h-[calc(1.25rem*2)] overflow-hidden mt-5" data-scroll data-scroll-speed="-.02">
						<div className="font-lexend-deca h-full" ref={slideDecRef}>
							<div className="font-thin" >
								<h2 className="text-sm min-h-full">{ps[0]}</h2>
								<h2 className="text-sm min-h-full">{ps[1]}</h2>
								<h2 className="text-sm min-h-full">{ps[2]}</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-between gap-9">
				<div className="h-full w-2 grid grid-rows-3 gap-3">
					{slides.map((_, index) => (
						<label
							key={index}
							htmlFor={`p${index + 1}`}
							className={`${
								slideIndex === index ? "bg-slate-200" : "bg-slate-200/30"
							} rounded-full w-full h-full`}
						></label>
					))}
					{slides.map((_, index) => (
						<input
							type="checkbox"
							name={`p${index + 1}`}
							id={`p${index + 1}`}
							className="hidden"
							onClick={() => setSlideIndex(index)}
							key={`input-${index}`}
						/>
					))}
				</div>
				<div className="aspect-square rounded-2xl overflow-hidden"  data-scroll data-scroll-speed=".06">
					<div className="flex h-full" ref={slideContainerRef}>
						{slides.map((slide, index) => (
							<div className="min-w-full h-full" key={index}>
								<img
									src={slide.image}
									alt={slide.alt}
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
