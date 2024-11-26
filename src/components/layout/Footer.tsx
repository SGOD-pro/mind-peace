"use client";
import Link from "next/link";
import React from "react";

function Footer() {
	return (
		<footer className="p-4 text-center bg-[#0C023A]">
			<p className="text-[#6F61F4] font-leagueSpartan font-bold text-xl tracking-widest">
				This website is created by{" "}
				<Link href="https://github.com/SGOD-pro" target="_blank">
					Souvik Karmakar{" "}
				</Link>
				with love.
			</p>
		</footer>
	);
}

export default Footer;
