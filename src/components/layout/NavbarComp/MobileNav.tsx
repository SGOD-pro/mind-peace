"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Links from "./Links";

const MobileNav = ({ showNav, toggleNav }:{showNav:boolean,toggleNav:() => void}) => {
	const mobNav = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		if (showNav) {
			gsap.to(mobNav.current, {
				opacity: 1,
				duration: 0.5,
				ease: "power2.inOut",
				visibility: "visible",
			});
		} else {
			gsap.to(mobNav.current, {
				opacity: 0,
				duration: 0.5,
				ease: "power2.inOut",
				onComplete: () => {
					if (mobNav.current) {
						mobNav.current.style.visibility = "hidden";
					}
				},
			});
		}
	}, [showNav]);

	return (
		<nav
			className="bg-[#c9a0c9]/80 inset-0 fixed z-50 backdrop-blur-sm flex items-center justify-center invisible opacity-0"
			ref={mobNav}
		>
			<div className="text-[#410041] font-lexend">
				<Links showNav={showNav} />
			</div>
		</nav>
	);
};

export default MobileNav;
