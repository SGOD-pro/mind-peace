"use client";
import React, { useEffect, useState } from "react";
import ShowDoctorCard from "./ShowDoctorCard";
import { Input } from "@/components/ui/input";
import useTherapistStore from "@/store/Therapist";
import FilterButton from "./FilterButon";
import Loder from "@/components/layout/Loder";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import FadeIn from "@/hooks/FadIn";

const filterOptions = [
	{ label: "All", value: "all" },
	{ label: "Psychiatrist", value: "psychiatrist" },
	{ label: "Psychologist", value: "psychologist" },
	{ label: "Neuropsych", value: "neuropsych" },
	{ label: "Family Therapist", value: "familyTherapist" },
];

function AllSection() {
	const hydrated = useTherapistStore((state) => state.hydrated);

	const [selected, setSelected] = useState<string | null>("all");

	const handleSelect = (label: string) => {
		setSelected(label);
	};
	const data = useTherapistStore((state) => state.data);

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
							{filterOptions.map((filter, index) => (
								<SelectItem
									value={filter.value}
									className=" focus:bg-[#D3FFFB] focus:text-black"
									key={index}
								>
									{filter.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Input
					className="w-[240px] ml-3"
					placeholder="Search by name.."
				></Input>
			</nav>

			<div className="max-w-7xl m-auto mt-7">
				{!hydrated && (
					<div className="h-dvh flex items-center justify-center">
						<Loder />
					</div>
				)}
				<FadeIn className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{data.map((item) => (
						<ShowDoctorCard
							name={item.name}
							speciality={item.speciality}
							image={item.image || "/icons/icon6.png"}
							_id={item._id}
							key={item._id}
						/>
					))}
				</FadeIn>
			</div>
		</section>
	);
}

export default AllSection;
