"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import ExpandableCard from "./ExpandableCard";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ExpandableCardDemo() {
	gsap.registerPlugin(ScrollTrigger);
	const [active, setActive] = useState<boolean | null | CardProps>(null);
	const id = useId();
	const parent = useRef<HTMLDivElement | null>(null);
	useGSAP(() => {
		if (!parent.current) return;
		const childs: HTMLDivElement[] = gsap.utils.toArray(
			parent.current.children
		);
		gsap.from(childs, {
			opacity: 0,
			y: 100,
			ease: "power1.inOut",
			stagger: 0.3,
			duration: 0.8,
			scrollTrigger: {
				trigger: parent.current,
				start: "top 75%",
			},
		});
	}, []);

	return (
		<>
			<ExpandableCard active={active} onClose={() => setActive(null)} id={id} />

			<div
				className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3  gap-4 "
				id="cards-parent"
				ref={parent}
			>
				<div className="lg:col-span-2 h-96 sm:h-full" data-sctoll data-scroll-speed="-.1">
					<motion.div
						className="h-full employees-gradient rounded-xl cursor-pointer hover:scale-[.98] transition-all card"
						onClick={(e) => setActive(cards[0])}
						layoutId={`card-Employers & Employee-${id}`}
					>
						<div className="flex items-center h-full w-full sm:p-4 justify-around relative">
							<div className="w-full h-full sm:w-72 rounded-lg overflow-hidden">
								<Image
									src={"/employee.jpg"}
									alt="employee"
									width={400}
									height={400}
									className="object-cover w-full h-full"
								></Image>
							</div>
							<div
								className="absolute sm:static top-0	left-0 w-full sm:w-1/2 p-2 text-center md:text-left"
								data-scroll
								data-scroll-speed={(Math.random() * 0.04 + 0.01).toString()}
							>
								<h2 className=" sm:static text-4xl font-lemon leading-none">
									Employers & Employee
								</h2>
								<p className="mt-4 leading-none font-lexend hidden sm:block">
									Prioritize mental health at work by setting boundaries,
									practicing mindfulness, and communicating openly. Take breaks,
									stay active, and build positive relationships to create a
									healthier workplace.
								</p>
							</div>
						</div>
					</motion.div>
				</div>
				<div className="lg:col-span-1 h-96 sm:h-fit"
					data-sctoll
					data-scroll-speed=".1"
				>
					<motion.div
						className=" bg-[#F6FFFE] relative rounded-xl overflow-hidden cursor-pointer hover:scale-[.98] transition-all card h-full"
						onClick={(e) => setActive(cards[1])}
						layoutId={`card-Yoga for Wellness-${id}`}
					>
						<div className="absolute uppercase tracking-wider font-leagueSpartan font-extrabold bg-[#b0e2d7] rounded-lg px-4 py-2 top-3 left-2 leading-tight flex items-center justify-center">
							<span className="mt-1">self-assignment</span>
						</div>
						<h4 className="absolute text-4xl font-bold font-lexend tracking-widest top-16 left-1/2 -translate-x-1/2 text-[#00273B]">
							YOGA
						</h4>
						<div className="w-full h-full">
							<Image
								src={"/yoga.jpeg"}
								alt="yoga"
								width={400}
								height={400}
								className="object-cover w-full h-full"
							></Image>
						</div>
					</motion.div>
				</div>
				<div className="lg:col-span-1 h-96 sm:h-fit"
					data-sctoll
					data-scroll-speed=".1"
				>
					<motion.div
						className="h-full bg-[#CFE19E] rounded-xl overflow-hidden relative cursor-pointer hover:scale-[.98] transition-all card"
						onClick={(e) => setActive(cards[2])}
						layoutId={`card-Exercise for Health-${id}`}
					>
						<div className="absolute uppercase tracking-wider font-leagueSpartan font-extrabold bg-[#D3FF6C] rounded-lg px-4 py-2 top-3 left-2 leading-tight flex items-center justify-center">
							<span className="mt-1">self-assignment</span>
						</div>
						<h4 className="absolute text-4xl font-bold font-lexend top-16 left-1/2 -translate-x-1/2 uppercase text-center leading-none tracking-wide text-[#FF411F]">
							exercise
						</h4>
						<div className="w-full h-full">
							<Image
								src={"/phy-activity.png"}
								alt="early-wake-up"
								width={400}
								height={400}
								className="object-cover w-full h-full"
							></Image>
						</div>
					</motion.div>
				</div>
				<div className="lg:col-span-2 h-96 sm:h-full" data-sctoll data-scroll-speed="-.1">
					<motion.div
						className="h-full student-gradient px-4 rounded-xl cursor-pointer hover:scale-[.98] transition-all card"
						onClick={(e) => setActive(cards[3])}
						layoutId={`card-Healthy Habits for Students-${id}`}
					>
						<div className="flex items-center h-full w-full p-4 justify-around">
							<div className="w-72 rounded-lg overflow-hidden">
								<Image
									src={"/student_tr.png"}
									alt="student"
									width={400}
									height={400}
									className="object-contain w-full h-full"
								></Image>
							</div>
							<div
								className="absolute sm:static top-0	left-0 w-full sm:w-1/2 p-2 text-center md:text-left"
								data-scroll
								data-scroll-speed={(Math.random() * 0.04 + 0.01).toString()}
							>
								<h2 className="text-4xl font-lemon leading-none">
									Learners & Students
								</h2>
								<p className="mt-4 leading-none font-lexend hidden sm:block">
									Balance study with self-care. Practice mindfulness,
									communicate, take breaks, and build positive relationships for
									better mental health.
								</p>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</>
	);
}

export const CloseIcon = () => {
	return (
		<motion.svg
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0,
				transition: {
					duration: 0.05,
				},
			}}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4 w-4 text-black"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M18 6l-12 12" />
			<path d="M6 6l12 12" />
		</motion.svg>
	);
};

const cards: CardProps[] = [
	{
		description: "Mental health tips for Employees",
		title: "Employers & Employee",
		src: "/employee.jpg",
		ctaText: "Visit",
		content: () => {
			return (
				<p>
					<div className="overflow-auto">
						Mental health is crucial for both productivity and overall
						well-being in the workplace. Here are some essential tips for
						employees:
						<br />
						<br />
						<strong>1. Maintain a Work-Life Balance:</strong> Set boundaries
						between work and personal time. Take regular breaks to rest and
						recharge.
						<br />
						<br />
						<strong>2. Practice Mindfulness:</strong> Engage in mindfulness
						exercises like meditation or deep breathing to reduce stress and
						stay focused.
						<br />
						<br />
						<strong>3. Seek Support:</strong> If you are feeling overwhelmed,
						reach out to a colleague, friend, or mental health professional.
						It's okay to ask for help.
						<br />
						<br />
						<strong>4. Stay Active:</strong> Physical activity can help improve
						mood and reduce anxiety. Consider short walks or desk exercises
						during breaks.
						<br />
						<br />
						<strong>5. Establish a Comfortable Workspace:</strong> Organize your
						workspace to minimize distractions and improve comfort, promoting a
						more productive environment.
						<br />
						Remember, taking care of your mental health is just as important as
						managing your tasks at work. Prioritize self-care and maintain a
						supportive workplace culture.
					</div>
				</p>
			);
		},
	},
	{
		description: "Benefits and Tips for Practicing Yoga",
		title: "Yoga for Wellness",
		src: "/yoga.jpeg",
		ctaText: "Learn More",
		bgColor: "",
		content: () => {
			return (
				<p>
					Yoga is a holistic practice that combines physical postures, breathing
					exercises, and meditation to promote overall well-being. Here are some
					benefits and tips to get started:
					<br />
					<br />
					<strong>1. Improves Flexibility:</strong> Regular practice of yoga can
					help increase flexibility, making everyday movements easier and
					reducing muscle stiffness.
					<br />
					<br />
					<strong>2. Enhances Strength:</strong> Yoga strengthens various muscle
					groups, especially the core, legs, and back, improving overall body
					strength and stability.
					<br />
					<br />
					<strong>3. Reduces Stress:</strong> Through mindful breathing and
					meditation, yoga helps lower stress levels and promotes relaxation.
					<br />
					<br />
					<strong>4. Boosts Mental Clarity:</strong> Regular practice enhances
					focus and mental clarity, helping you stay calm and clear-headed
					throughout the day.
					<br />
					<br />
					<strong>5. Improves Posture:</strong> Yoga encourages proper alignment
					and body awareness, leading to better posture and reduced back or neck
					pain.
					<br />
					<br />
					<strong>Tips to Get Started:</strong>
					<ul className="list-disc ml-6">
						<li>Start with beginner-friendly poses and gradually progress.</li>
						<li>Practice in a comfortable, quiet space.</li>
						<li>Wear breathable, stretchy clothing for better movement.</li>
						<li>Focus on your breathing to enhance relaxation.</li>
						<li>
							Consider joining a class or following online tutorials to learn
							proper techniques.
						</li>
					</ul>
					<br />
					Whether you're looking to reduce stress or improve physical fitness,
					yoga offers numerous benefits for the mind and body. Dedicate a few
					minutes each day to your practice and experience the positive changes.
				</p>
			);
		},
	},

	{
		description: "Benefits and Tips for Regular Exercise",
		title: "Exercise for Health",
		src: "/phy-activity.png",
		ctaText: "Start Now",
		content: () => {
			return (
				<p>
					Regular exercise is essential for maintaining a healthy body and mind.
					Here are some key benefits and tips to help you incorporate exercise
					into your daily routine:
					<br />
					<br />
					<strong>1. Enhances Physical Health:</strong> Exercise helps improve
					cardiovascular health, build muscle strength, and maintain a healthy
					weight.
					<br />
					<br />
					<strong>2. Boosts Mental Well-being:</strong> Regular physical
					activity releases endorphins, which help reduce stress, anxiety, and
					depression, leading to a more positive outlook on life.
					<br />
					<br />
					<strong>3. Improves Sleep Quality:</strong> Exercise can help regulate
					sleep patterns, making it easier to fall asleep and wake up feeling
					refreshed.
					<br />
					<br />
					<strong>4. Increases Energy Levels:</strong> Regular workouts enhance
					stamina and energy, helping you feel more energetic throughout the
					day.
					<br />
					<br />
					<strong>5. Strengthens Immunity:</strong> Engaging in physical
					activity boosts the immune system, reducing the risk of common
					illnesses.
					<br />
					<br />
					<strong>Tips to Get Started:</strong>
					<ul className="list-disc ml-6">
						<li>
							Begin with activities you enjoy, such as walking, jogging,
							cycling, or dancing.
						</li>
						<li>
							Set realistic goals and gradually increase the intensity of your
							workouts.
						</li>
						<li>
							Combine cardio, strength training, and flexibility exercises for a
							balanced routine.
						</li>
						<li>
							Stay hydrated and eat a balanced diet to support your exercise
							regimen.
						</li>
						<li>Listen to your body; rest when needed to avoid injuries.</li>
					</ul>
					<br />
					Embrace regular exercise as a part of your lifestyle to experience
					lasting benefits for your physical and mental well-being. Consistency
					is key, so keep moving, stay motivated, and enjoy the journey to a
					healthier you.
				</p>
			);
		},
	},

	{
		description: "Tips and Benefits for Students",
		title: "Healthy Habits for Students",
		src: "/student_tr.png",
		ctaText: "Learn More",
		content: () => {
			return (
				<p>
					Being a student is a busy and exciting time, but it's also essential
					to maintain a healthy lifestyle to succeed academically and
					personally. Here are some helpful tips and benefits for students:
					<br />
					<br />
					<strong>1. Stay Active:</strong> Regular physical activity improves
					concentration, memory, and mood, helping students perform better in
					their studies. Even a quick walk or stretching can make a difference.
					<br />
					<br />
					<strong>2. Prioritize Sleep:</strong> Quality sleep is crucial for
					cognitive functions like memory retention and problem-solving. Aim for
					7-8 hours of sleep to feel more focused and energized throughout the
					day.
					<br />
					<br />
					<strong>3. Balanced Nutrition:</strong> Eating a balanced diet with
					plenty of fruits, vegetables, and whole grains fuels the brain and
					body. Avoid excessive junk food and sugary drinks that can lead to
					fatigue and lack of focus.
					<br />
					<br />
					<strong>4. Manage Stress:</strong> Students often face stress from
					exams, assignments, and social life. Practice relaxation techniques
					such as meditation, deep breathing, or yoga to keep stress in check.
					<br />
					<br />
					<strong>5. Time Management:</strong> Learning to manage time
					effectively can reduce last-minute stress and improve academic
					performance. Use planners or digital tools to organize study sessions,
					assignments, and leisure time.
					<br />
					<br />
					<strong>Tips for Effective Studying:</strong>
					<ul className="list-disc ml-6">
						<li>
							Break down study material into smaller, manageable sections.
						</li>
						<li>Create a distraction-free study environment.</li>
						<li>Take regular breaks to refresh your mind.</li>
						<li>
							Engage in active learning by taking notes, asking questions, and
							discussing topics with peers.
						</li>
						<li>
							Seek help when needed—don’t hesitate to reach out to teachers or
							friends if you're struggling with a subject.
						</li>
					</ul>
					<br />
					Adopting these healthy habits can help students not only excel
					academically but also enjoy a balanced and fulfilling student life.
					Remember, consistency is the key to success, so start small and build
					your routine over time.
				</p>
			);
		},
	},
];

// {cards.map((card, index) => (
//   <motion.div
//     layoutId={`card-${card.title}-${id}`}
//     key={card.title}
//     onClick={() => setActive(card)}
//     className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
//   >
//     <div className="flex gap-4 flex-col  w-full">
//       <motion.div layoutId={`image-${card.title}-${id}`}>
//         <Image
//           width={100}
//           height={100}
//           src={card.src}
//           alt={card.title}
//           className="h-60 w-full  rounded-lg object-cover object-top"
//         />
//       </motion.div>
//       <div className="flex justify-center items-center flex-col">
//         <motion.h3
//           layoutId={`title-${card.title}-${id}`}
//           className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
//         >
//           {card.title}
//         </motion.h3>
//         <motion.p
//           layoutId={`description-${card.description}-${id}`}
//           className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
//         >
//           {card.description}
//         </motion.p>
//       </div>
//     </div>
//   </motion.div>
// ))}
