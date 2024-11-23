import { links } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, memo } from "react";
const Links = memo(() => {
	const linksRef = useRef<HTMLAnchorElement[]>([]);
	const pathname = usePathname();
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
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
});
export default Links;
