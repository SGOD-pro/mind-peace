import Image from "next/image";
import React from "react";

function Section1() {
	return (
		<div className="flex bg-[#FBB4B8] rounded-b-3xl justify-around items-center relative h-[95dvh] w-full">
			<div className="w-[40%]">
				<h1 className="text-7xl font-lemon">Meet your</h1>
				<h3 className="text-4xl font-lexend-exa uppercase text-[#EF252D] mt-2">
					THERAPIST team
				</h3>
				<p className="text-sm md:text-base text-[#DC666A] w-[80%] mt-8 leading-none">
					Our skilled doctors bring expertise and care to every patient,
					ensuring you receive the best treatment and support for a healthier
					life.
				</p>
			</div>
			<div className="w-[50%]">
				<Image
					src={"/therapist.png"}
					alt="therapist"
					width={800}
					priority={true}
					height={600}
					className="w-full h-full object-cover"
				></Image>
			</div>
			<h2
				className="text-5xl font-lexend tracking-tighter absolute bg-[#EBFFFD] px-6 py-3 rounded-2xl bottom-2 left-2"
				data-scroll
				data-scroll-speed=".7"
			>
				Our Therapist
			</h2>
		</div>
	);
}

export default Section1;
