import { Input } from "@/components/ui/input";
import React from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
function AllTherapistPage() {
	return (
		<main className="h-full w-full">
			<div className="flex items-center gap-3 flex-wrap basis-52">
				<Input placeholder="Search.." className="flex-grow min-w-52 w-[calc(100%-15rem)]"></Input>
				<div className="w-52 flex-grow">
					<Select>
						<SelectTrigger>
							<SelectValue placeholder="Select speciality" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Neuropsych">Neuropsychology</SelectItem>
							<SelectItem value="Psychologist">Psychologist</SelectItem>
							<SelectItem value="Psychotherapist">Psychotherapist</SelectItem>
							<SelectItem value="Psychiatry">Psychiatry</SelectItem>
							<SelectItem value="Family Therapist">Family Therapist</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</main>
	);
}

export default AllTherapistPage;
