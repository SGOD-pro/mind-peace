"use client";
import React, { memo, useEffect, useRef } from "react";
import { greetings, jokes } from "@/constants";
import Image from "next/image";
import "./home.css";
import VanillaTilt from "vanilla-tilt";

const getRandomJoke = () => {
	// Get a random joke excluding the first one
	const randomIndex = Math.floor(Math.random() * (jokes.length - 1)) + 1;
	return jokes[randomIndex];
};
const HomeProfile = () => {
	const renderDivBasedOnTime = () => {
		const hour = new Date().getHours();

		if (hour >= 5 && hour < 9) {
			// Morning (5 AM to 9 AM)
			return (
				<div className="bg-gradient-to-b from-sky-300 to-blue-500 profile-container">
					{/* Header Section */}
					<p className="text-slate-800 joke">{getRandomJoke()}</p>
					<div className="content-container">
						<h2 className="greeting">{greetings.morning}</h2>
						<div className="w-fit hidden sm:block">
							<Image
								src="/greetings/Alarm_Ringing.svg"
								alt="Alarm Ringing"
								width={400}
								height={400}
								className="w-full h-auto object-contain"
							/>
						</div>
					</div>

					{/* Footer Section */}
					<p className="footer-text">
						Start your day with positivity and energy!
					</p>
				</div>
			);
		} else if (hour >= 9 && hour < 17) {
			// Working Hours (9 AM to 5 PM)
			return (
				<div className="bg-gradient-to-b from-yellow-400 to-orange-500 profile-container">
					{/* Header Section */}
					<p className="text-slate-800 joke">{getRandomJoke()}</p>
					<div className="content-container">
						<h2 className="greeting">{greetings.workingHours}</h2>
						<div className="w-fit hidden sm:block">
							<Image
								src="/greetings/Office_Work.svg"
								alt="Office Work"
								width={400}
								height={400}
								className="w-full h-auto object-contain"
							/>
						</div>
					</div>

					{/* Footer Section */}
					<p className="footer-text">Stay productive and achieve your goals!</p>
				</div>
			);
		} else if (hour >= 17 && hour < 21) {
			// Evening (5 PM to 9 PM)
			return (
				<div className="bg-gradient-to-t from-blue-800 to-indigo-600 profile-container">
					{/* Header Section */}
					<p className="text-slate-100 joke">{getRandomJoke()}</p>
					<div className="content-container">
						<h2 className="greeting">{greetings.evening}</h2>
						<div className="w-fit hidden sm:block">
							<Image
								src="/greetings/Book_Lover.svg"
								alt="Evening Relaxation"
								width={400}
								height={400}
								className="w-full h-auto object-contain"
							/>
						</div>
					</div>

					{/* Footer Section */}
					<p className="footer-text">Relax and unwind after a long day!</p>
				</div>
			);
		} else {
			// Night (9 PM to 5 AM)
			return (
				<div className="bg-gradient-to-b from-indigo-800 to-[#170035] profile-container">
					{/* Header Section */}
					<p className="text-slate-100 joke">{getRandomJoke()}</p>
					<div className="content-container">
						<h2 className="greeting">{greetings.night}</h2>
						<div className="w-80 hidden sm:block">
							<Image
								src="/greetings/Dream.svg"
								alt="Night Dreaming"
								width={400}
								height={400}
								className="w-full h-auto object-contain"
							/>
						</div>
					</div>

					{/* Footer Section */}
					<p className="footer-text">Relax and unwind after a long day!</p>
				</div>
			);
		}
	};
	const div = useRef<TiltDiv>(null);
	useEffect(() => {
		if (!div.current) {
			return;
		}
		VanillaTilt.init(div.current, {
			max:3, // Maximum tilt angle
			speed: 300, // Speed of the effect
			glare: true, // Enable glare effect
			"max-glare": 0.2, // Maximum glare opacity
		});

		// Cleanup function to destroy tilt effects on unmount
		return () => {
			div.current?.vanillaTilt?.destroy();
		};
	}, []);
	return (
		<section className="rounded-xl overflow-hidden w-full" ref={div}>
			{renderDivBasedOnTime()}
		</section>
	);
};

export default memo(HomeProfile);
