import DialogComp from "@/components/DialogComp";
import Image from "next/image";
import React, { memo } from "react";
import DrawerComp from "../DrawerComp";
import Details from "./Details";

const TriggerButton = memo(() => {
	return (
		<button className=" px-4 py-2 rounded-md bg-blue-500 text-white bottom-2 right-2">
			View Profile
		</button>
	);
});
function ShowDoctorCard({
	name,
	_id,
	speciality,
	image,
}: {
	speciality: string;
	name: string;
	_id: string;
	image: string;
}) {
	return (
		<div className="relative rounded-lg shadow shadow-black/50 hover:scale-105  hover:shadow-md p-4">
			<div className="rounded-full overflow-hidden border w-44 h-44 p-2 m-auto border-blue-500">
				<Image
					src={image}
					alt="doc1"
					width={400}
					height={500}
					className="w-full h-full object-cover object-top rounded-full"
				></Image>{" "}
			</div>

			<h2 className="text-3xl font-lexend">
				Dr. <span className="">{name}</span>
			</h2>
			<p className="">{speciality}</p>
			<div className="text-right">
				<DrawerComp trigger={<TriggerButton />} content={<Details id={_id}/>}/>
			</div>
		</div>
	);
}

export default memo(ShowDoctorCard);
