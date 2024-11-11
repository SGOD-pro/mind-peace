"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo, useEffect, useRef, useState } from "react";
import LoginFormBtn from "@/components/LoginFormBtn";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuIcon } from "../icons/MenuIcon";
import { links } from "@/constants";
const Icon = memo(() => {
	return (
		<div className="w-12 h-12">
			<Image
				src="/logo.png"
				alt="logo"
				width={100}
				height={100}
				className="w-full h-full object-contain"
			></Image>
		</div>
	);
});

Icon.displayName = "LogoIcon";
function Navbar() {
	const pathname = usePathname();
	if (
		pathname.includes("/dashboard") ||
		pathname.includes("/admin") ||
		pathname.includes("/not-authorized") ||
		pathname === "/404"
	) {
		return null;
	}
	const isMobile = useIsMobile();
	const nav = useRef(null);
	useGSAP(() => {
		if (pathname !== "/") {
			return;
		}
		gsap.from(nav.current, {
			opacity: 0,
			y: "-100%",
			// delay: 4.8,
			ease: "power2.inOut",
		});
	}, []);
	const Links = memo(() => {
		const linksRef = useRef<HTMLAnchorElement[]>([]);

		useGSAP(() => {
			if (!showNav||!isMobile) {
				return;
			}

			linksRef.current.forEach((link, index) => {
				console.log(link);
				gsap.from(link.children, {
					y: -20,
					opacity: 0,
					stagger: {
						each: 0.1,
						from: "end",
					},
					duration: 0.55,
					ease: "power2.inOut",
				});
			});
		}, []);

		const maxLabelLength = Math.max(...links.map((link) => link.label.length));

		const padLabel = (label: string) => label.padEnd(maxLabelLength, " ");

		return (
			<ul className="flex gap-8 text-4xl md:text-2xl md:flex-row flex-col">
				{links.map((link, linkIndex) => (
					<li key={link.href}>
						<Link
							className={`${
								pathname === link.href ? "opacity-100" : "opacity-60"
							} flex`}
							href={link.href}
							ref={(el) => {
								if (el) linksRef.current.push(el);
							}}
						>
							{/* Pad the label and split it into individual characters */}
							{padLabel(link.label)
								.split("")
								.map((char, charIndex) => (
									<h2 key={charIndex}>&#8203;{char}</h2>
								))}
						</Link>
					</li>
				))}
			</ul>
		);
	});
	const mobNav = useRef<HTMLDivElement>(null);
	const [showNav, setShowNav] = useState(false);
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
useEffect(() => {
  if (showNav) {
	setShowNav(false);
  }
}, [pathname])

	return (
		<>
			{!isMobile ? (
				<nav
					className="w-[75%] rounded-2xl bg-[#D4FCFF]/30 m-auto items-center font-me justify-between p-3 px-4 text-[#410041] font-bold font-leagueSpartan fixed z-50 top-4 left-1/2 -translate-x-1/2 backdrop-blur shadow-md shadow-black/20 hidden md:flex"
					ref={nav}
				>
					<Icon />
					<div className="">
						<Links />
					</div>

					<div className=" flex items-center">
						<LoginFormBtn />
					</div>
				</nav>
			) : (
				<>
					<div className="fixed z-50 w-full flex items-center justify-between px-4 py-3">
						<Icon />
						<div className="pr-14">
							<LoginFormBtn />
						</div>
					</div>
					<div className="fixed z-[60] right-4 top-3">
						<button
							onClick={() => {
								setShowNav(!showNav);
							}}
							className={`${
								!showNav && "border shadow-md shadow-black/20"
							} relative z-[100] text-black rounded-lg backdrop-blur-sm `}
						>
							<MenuIcon open={showNav} />
						</button>
					</div>
					<nav
						className="bg-[#c9a0c9]/80 inset-0 fixed z-50 backdrop-blur-sm flex items-center justify-center invisible opacity-0"
						ref={mobNav}
					>
						<div className="text-[#410041] font-lexend">
							<Links />
						</div>
					</nav>
				</>
			)}
		</>
	);
}

export default memo(Navbar);
