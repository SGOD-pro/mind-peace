"use client";
import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";
function TiltCard({
	className,
	children,
    tiltAngle=3
}: {
	className: HTMLElement["className"];
	children: React.ReactNode;
    tiltAngle?:number
}) {
	const div = useRef<TiltDiv>(null);
	useEffect(() => {
		if (!div.current) {
			return;
		}
		VanillaTilt.init(div.current, {
			max: tiltAngle, // Maximum tilt angle
			speed: 300, // Speed of the effect
			glare: true, // Enable glare effect
			"max-glare": 0.2, // Maximum glare opacity
		});

		// Cleanup function to destroy tilt effects on unmount
		return () => {
			div.current?.vanillaTilt?.destroy();
		};
	}, []);
	return (
		<div ref={div} className={className}>
			{children}
		</div>
	);
}

export default TiltCard;
