import Image from "next/image";
import React from "react";
import Link from "next/link";
function Section2() {
	return (
		<>
			<div className="rounded-3xl bg-[#F8E6E4] w-full h-full p-4 md:p-8 pt-10 lg:pt-0 flex lg:flex-row flex-col-reverse items-center overflow-hidden">
				<div className="lg:w-1/2" data-scroll data-scroll-speed="-.1">
					<Image
						src="/doc2.jpg"
						alt="doc2"
						width={800}
						height={800}
						className="w-full h-full object-contain"
					/>
				</div>
				<div className="px-10 lg:w-1/2 text-center lg:text-right">
					<h1
						className="text-5xl leading-[2.5rem] lg:text-7xl lg:leading-[5rem] font-lemon text-[#2F2041]"
						data-scroll
						data-scroll-speed=".05"
					>
						How <span className="text-[#3B46A0]"> can we</span> help you?
					</h1>
					<p
						className="font-lexend lg:text-lg my-5 tracking-tighter"
						data-scroll
						data-scroll-speed=".02"
					>
						Explore our therapist-led services designed to support your mental
						well-being, from therapy sessions to mindfulness practices.
					</p>
					<div className="" data-scroll data-scroll-speed=".06">
						<Link
							href="/therapist"
							className="bg-[#D9465E] rounded-lg tracking-wider px-3 py-2 font-lexend text-white text-xl"
						>
							Explore
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Section2;
