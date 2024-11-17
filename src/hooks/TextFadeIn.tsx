import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
function TextFadeIn({ children }: { children: React.ReactNode }) {
	const div = useRef(null);
	useGSAP(() => {
		gsap.from(div.current, {
			opacity: 0,
			y: 200,
			duration: 0.5,
			scrollTrigger: {
				trigger: div.current,
				start: "top 80%",
				toggleActions: "play reverse play reverse",
				markers: true,
			},
		});
	});
	return <div ref={div}>{children}</div>;
}

export default TextFadeIn;