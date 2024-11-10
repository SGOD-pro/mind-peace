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
			if (
				content.current &&
				!content.current.contains(target) &&
				!target.classList.contains("login-btn") 
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [setIsOpen]);

	return (
		<>
		
			<div
				className={`fixed top-1/2 right-3 md:right-10 transition-all -translate-y-1/2 z-50 ${
					isOpen
						? "opacity-100 -translate-x-0"
						: "opacity-0 translate-x-[120%] "
				}`}
				ref={content}
			>
				<LoginForm />
			</div>
		</>
	);
}

export default memo(Main);
