"use client";
import React, { memo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { links } from "@/constants";
import { useIsMobile } from "@/hooks/use-mobile";

const Links = memo(({ showNav }: { showNav: boolean }) => {
	const isMobile = useIsMobile();
	const pathname = usePathname();
	const linksRef = useRef<HTMLAnchorElement[]>([]);

	useGSAP(() => {
		if (!showNav) return;
		linksRef.current.forEach((link, index) => {
            console.log(link);
            gsap.from(link.children, {
                y: -10,
                opacity: 0,
                stagger: {
                    each: 0.2,
                    from: "end",
                },
                duration: 0.7,
                ease: "power2.inOut",
            });
        });
	}, [showNav]);

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

Links.displayName = "NavLinks";
export default Links;
