import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Carousel = ({ slides }: { slides: { image: string; alt: string }[] }) => {
	const slideContainerRef = useRef(null);
	const slideIndex = useRef(0);

	useEffect(() => {
		const slideCount = slides.length;
		const interval = setInterval(() => {
			gsap.to(slideContainerRef.current, {
				x: `-${100 * slideIndex.current}%`,
				duration: 1,
				ease: "power2.inOut",
			});
			slideIndex.current = (slideIndex.current + 1) % slideCount;
		}, 3000); // Adjust the interval (3000ms = 3 seconds)

		return () => clearInterval(interval);
	}, [slides.length]);

	return (
		<div className="carousel">
			<div className="slide-container" ref={slideContainerRef}>
				{slides.map((slide, index) => (
					<div className="slide" key={index}>
						<img src={slide.image} alt={slide.alt} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
