"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ReviewCard = ({
	img,
	name,
	username,
	body,
}: {
	img: string;
	name: string;
	username: string;
	body: string;
}) => {
	return (
		<figure
			className={cn(
				"relative cursor-pointer overflow-hidden rounded-xl border p-4",
				// light styles
				"border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
				// dark styles
				"dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
			)}
		>
			<div className="flex flex-row items-center gap-2 relative ">
                <div className="absolute top-0 right-0 rounded-md px-2 py-1 bg-[#40c0b3] text-sm">4.0⭐</div>
				<div className="w-12 h-12">
					<Image
						className="rounded-full w-full h-full object-cover object-top"
						width="32"
						height="32"
						alt=""
						src={img}
					/>
				</div>
				<div className="flex flex-col">
					<figcaption className="text-sm font-medium dark:text-white">
						{name}
					</figcaption>
					<p className="text-xs font-medium dark:text-white/40">3 days ago</p>
				</div>
			</div>
			<blockquote className="mt-2 text-sm leading-tight font-sans">{body}</blockquote>
		</figure>
	);
};

export default ReviewCard;
