"use client";
import React, { memo, useEffect, useRef } from "react";
import { useLoginForm } from "@/store/LoginForm";
import LoginForm from "@/components/login-form";

function Main() {
	const isOpen = useLoginForm((state) => state.isOpen);
	const setIsOpen = useLoginForm((state) => state.setIsOpen);
	const content = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Check if click is outside the content ref and not on a button with class "login-btn"
			if (
				content.current &&
				!content.current.contains(target) &&
				!target.classList.contains("login-btn") // Use classList to check for class
			) {
				setIsOpen(false);
			}
		};

		// Add click event listener
		document.addEventListener("click", handleClickOutside);

		// Cleanup function to remove the event listener
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [setIsOpen]);
	

	return (
		<div
			className={`fixed top-1/2 right-10 transition-all -translate-y-1/2 z-50 ${
				isOpen ? "opacity-100 -translate-x-0" : "opacity-0 translate-x-[120%] "
			}`}
			ref={content}
		>
			<LoginForm />
		</div>
	);
}

export default memo(Main);
