import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

function FadeIn({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: HTMLElement["className"];
}) {
	gsap.registerPlugin(ScrollTrigger);
	const div = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		console.log(div.current?.children)
		if (!div.current) {
			return;
		}
		const childs: HTMLDivElement[] = gsap.utils.toArray(
			div.current.children
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
					markers: true,
				},
			});
		});
	}, [div.current]);
	return (
		<div ref={div} className={className}>
			{children}
		</div>
	);
}

export default FadeIn;
