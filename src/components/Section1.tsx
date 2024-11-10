import Image from "next/image";
import React from "react";

function Section1() {
	return (
		<>
			<div className="absolute top-32 text-center lg:text-left lg:static lg:px-10 w-[80%] m-auto lg:w-[40%]" data-scroll data-scroll-speed="-.2">
				<h1 className="text-6xl lg:text-8xl leading-[3rem] lg:leading-[5rem] font-lemon text-[#FFB4BB]">
					Mental health <span className="text-[#3D282A]">is wealth</span>
				</h1>
				<p className="font-bold text-2xl mt-8">
					Nurture your mind, find balance, and live fully
				</p>
			</div>
			<div className="mt-[14rem] lg:mt-0 w-full lg:w-[60%] h-[80dvh]" data-scroll data-scroll-speed=".5">
				<Image
					src="/doc1.png"
					alt="doc1"
					width={800}
					height={800}
					className="w-full h-full object-contain"
					priority={true}
				></Image>
			</div>
		</>
	);
}

export default Section1;
