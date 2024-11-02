"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

function Footer() {
	const pathname = usePathname();
	if (pathname.includes("/dashboard") || pathname.includes("/admin") || pathname.includes("/not-authorized") || pathname === "/404") {
        return null;
    }
	return (
		<footer className="p-4 text-center bg-[#0C023A]">
			<p className="text-[#6F61F4] font-leagueSpartan font-bold text-xl tracking-widest">
				This website is created by{" "}
				<Link href="https://github.com/AnirudhH" target="_blank">
					Souvik Karmakar{" "}
				</Link>
				with love.
			</p>
		</footer>
	);
}

export default Footer;
