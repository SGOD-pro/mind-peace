import React, { useEffect, useRef, useState } from "react";
import ShowDoctorCard from "./ShowDoctorCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Input } from "@/components/ui/input";
import useTherapistStore from "@/store/Therapist";
import ApiService from "@/helper/ApiService";
import FilterButton from "./FilterButon";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loder from "@/components/layout/Loder";
const apiService = new ApiService("/api/therapist");

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
const filterOptions = [
	{ label: "All", value: "all" },
	{ label: "Psychiatrist", value: "psychiatrist" },
	{ label: "Psychologist", value: "psychologist" },
	{ label: "Neuropsych", value: "neuropsych" },
	{ label: "Family Therapist", value: "familyTherapist" },
];

function AllSection() {
	gsap.registerPlugin(ScrollTrigger);
	const allitems = useTherapistStore((state) => state.getAllUsers);
	const setItems = useTherapistStore((state) => state.setAllItems);
	const hydrated = useTherapistStore((state) => state.hydrated);
	const showTherapistContainer = useRef<HTMLDivElement>(null);
	useGSAP(() => {
		if (!showTherapistContainer.current) {
			return;
		}
		const childrens: HTMLDivElement[] = gsap.utils.toArray(
			showTherapistContainer.current.children
		);
		console.log(childrens);
		childrens.forEach((child) => {
			gsap.from(child, {
				opacity: 0,
				duration: 0.4,
				y: 50,
				scrollTrigger: {
					trigger: child,
					start: "top 80%",
					end: "top 80%",
					// markers: true,
				},
			});
		});
	}, [hydrated]);
	const [selected, setSelected] = useState<string | null>("all");

	const handleSelect = (label: string) => {
		setSelected(label);
	};
	useEffect(() => {
		if (hydrated) {
			return;
		}
		async function fetch() {
			const res = await apiService.get<Therapists[]>({
				showSuccessToast: false,
			});
			if (res.data) {
				setItems(res.data);
			}
		}
		fetch();
	}, []);

	return (
		<section className="">
			<h2 className="text-4xl font-lexend tracking-tighter">All therapists</h2>
			<nav className="flex mx-auto w-[90%] justify-end items-center mt-4">
				<ul className="gap-4 flex-nowrap hidden md:flex">
					{filterOptions.map((filter) => (
						<FilterButton
							key={filter.value}
							label={filter.label}
							isSelected={selected === filter.value}
							onClick={() => handleSelect(filter.value)}
						/>
					))}
				</ul>
				<Select
					onValueChange={(e) => {
						handleSelect(e);
					}}
					defaultValue={selected || "all"}
				>
					<SelectTrigger className="w-[180px] md:hidden">
						<SelectValue placeholder="Filter by speciality" />
					</SelectTrigger>
					<SelectContent className="bg-white text-black">
						<SelectGroup>
							<SelectLabel>Speciality</SelectLabel>
							{filterOptions.map((filter) => (
								<SelectItem value={filter.value} className=" focus:bg-[#D3FFFB] focus:text-black">{filter.label}</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Input className="w-[240px] ml-3" placeholder="Search by name.."></Input>
			</nav>

			<div className="max-w-7xl m-auto mt-7">
				{!hydrated && (
					<div className="h-dvh flex items-center justify-center">
						<Loder />
					</div>
				)}
				<div
					className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
					ref={showTherapistContainer}
				>
					{allitems().map((item) => (
						<ShowDoctorCard
							name={item.name}
							speciality={item.speciality}
							image={item.image || "/icons/icon6.png"}
							_id={item._id}
							key={item._id}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default AllSection;
