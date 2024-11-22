"use client";
import React, { useState } from "react";

import DrawerComponent from "../components/DrawerComponent";
import DoctorCard from "@/app/therapist/components/DoctorCard";
import FetchTherapist from "@/hooks/FetchTherapist";
import useTherapistStore from "@/store/Therapist";

function NewAppointment() {
	const [open, setOpen] = useState(false);
	const therapists = useTherapistStore((state) => state.data);
	const [selectedTherapist, setSelectedTherapist] = useState<Therapists|null>(null);
	const closeDrawer = () => {
		setOpen(false);
		setSelectedTherapist(null);
	};
	const openDrawer = (data:Therapists) => {
		setOpen(true);
		setSelectedTherapist(data);
	};

	return (
		<div>
			<DrawerComponent open={open} setOpen={closeDrawer} user={selectedTherapist} />
			<FetchTherapist>
				<div className="flex-wrap grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
					{therapists.map((therapist,index) => (
						<DoctorCard user={therapist} key={index} onclickFunction={openDrawer} />
					))}
				</div>
			</FetchTherapist>
		</div>
	);
}

export default NewAppointment;
