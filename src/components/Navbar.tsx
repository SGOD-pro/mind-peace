"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { memo } from "react";
import LoginFormBtn from "./LoginFormBtn";

function Navbar() {
	const pathname = usePathname();
	if (pathname.includes("/dashboard") || pathname.includes("/admin")) {
		return null;
	}

	return (
		<nav className="w-[75%] rounded-2xl bg-[#D4FCFF]/30 m-auto flex items-center font-me justify-between p-3 px-4 text-[#410041] font-bold font-leagueSpartan fixed z-50 top-4 left-1/2 -translate-x-1/2 backdrop-blur shadow-md shadow-black/20">
			<div className="w-12 h-12">
				<Image
					src="/logo.png"
					alt="logo"
					width={100}
					height={100}
					className="w-full h-full object-contain"
				></Image>
			</div>
			<div className="">
				<ul className="flex gap-8 text-2xl">
					<li className="">
						<Link
							className={`${pathname === "/" ? "opacity-100" : "opacity-60"}`}
							href={"/"}
						>
							Home
						</Link>
					</li>
					<li className="">
						<Link
							className={`${
								pathname === "/therapist" ? "opacity-100" : "opacity-60"
							}`}
							href={"/"}
						>
							Therapist
						</Link>
					</li>
					<li className="">
						<Link
							className={`${
								pathname === "/about" ? "opacity-100" : "opacity-60"
							}`}
							href={"/"}
						>
							About
						</Link>
					</li>
				</ul>
			</div>
			<div className="">
				<LoginFormBtn />
			</div>
		</nav>
	);
}

export default memo(Navbar);
