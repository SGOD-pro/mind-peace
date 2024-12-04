"use client";
import React, { useEffect, useState } from "react";
import ShowLoginForm from "@/components/ShowLoginForm";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VerifySession from "@/hooks/VerifySession";

function Main({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const showNavbarAndFooter = ["/", "/therapist", "/about"].includes(pathname);

	useEffect(() => {
		if (process.env.NODE_ENV === "development") {
			return;
		}
		const disableRightClick = (e: MouseEvent) => e.preventDefault();
		document.addEventListener("contextmenu", disableRightClick);

		return () => {
			document.removeEventListener("contextmenu", disableRightClick);
		};
	}, []);
	useEffect(() => {
		const selectionCopy = (e: ClipboardEvent) => {
			// const selectedData=window.getSelection()?.toString()
			e.clipboardData?.setData("text/plain", "Hey noob. Get out from here..!");
			e.preventDefault();
		};
		document.addEventListener("copy", selectionCopy);
		return () => {
			document.removeEventListener("copy", selectionCopy);
		};
	}, []);

	return (
		<main className="bg-[#F9F9F9] w-full min-h-dvh">
			<ShowLoginForm />
			{showNavbarAndFooter && <Navbar />}
			<VerifySession>{children}</VerifySession>
			{showNavbarAndFooter && <Footer />}
		</main>
	);
}

export default Main;
