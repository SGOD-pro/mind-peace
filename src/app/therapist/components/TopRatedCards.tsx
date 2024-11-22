import Image from "next/image";
import React from "react";

function TopRatedCards({
	name,
	speciality,
	image,
	rating,
}: {
	name: string;
	speciality: string;
	image: string;
	rating?: number;
}) {
	return (
		<div className="w-64  h-96 p-2 top-rated-card rounded-xl flex-shrink-0 relative">
			<div className="h-[70%] overflow-hidden w-full rounded-lg mb-4">
				<Image
					src={image}
					alt="doc1"
					width={400}
					height={500}
					className="w-full h-full object-cover object-top"
				></Image>
			</div>
			<h4 className="text-xl">
				<span>Dr.</span> {name}
			</h4>
			<p>{speciality}</p>
			<span className="absolute text-lg px-3 rounded-md bg-[#f9f9f9] bottom-2 right-2 pr-0">
				{rating||"4.0"} ⭐
			</span>
		</div>
	);
}

export default TopRatedCards;
