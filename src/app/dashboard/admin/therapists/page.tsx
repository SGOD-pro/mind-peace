"use client";
import React from "react";

import { TherapistTable } from "../components/DataTable";
import useTherapistStore from "@/store/Therapist";
import FetchTherapist from "@/hooks/FetchTherapist";

function AllTherapistPage() {
	const data = useTherapistStore((state) => state.data);
	return (
		<main className="h-full w-full">
			<FetchTherapist>
				<TherapistTable data={data} />
			</FetchTherapist>
		</main>
	);
}

export default AllTherapistPage;
