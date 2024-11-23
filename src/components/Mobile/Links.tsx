import { links } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const Links = memo(({showNav}: {showNav:boolean}) => {
	const linksRef = useRef<HTMLAnchorElement[]>([]);
	const pathname = usePathname();
	useGSAP(() => {
		linksRef.current.forEach((link) => {
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
	}, [showNav]);
	const maxLabelLength = Math.max(...links.map((link) => link.label.length));

	const padLabel = (label: string) => label.padEnd(maxLabelLength, " ");

	return (
		<ul className="flex gap-8 text-4xl md:text-2xl md:flex-row flex-col">
			{links.map((link, linkIndex) => (
				<li key={linkIndex}>
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
								<h2 key={charIndex} className="text-black">&#8203;{char}</h2>
							))}
					</Link>
				</li>
			))}
		</ul>
	);
});
export default Links;
