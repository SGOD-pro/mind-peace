"use client";
import React, { useEffect } from "react";
import useTherapistStore from "@/store/Therapist";
import ApiService from "@/helper/ApiService";
import Loading from "@/app/loading";
const apiService = new ApiService("/api/therapist");

function FetchTherapist({ children }: { children: React.ReactNode }) {
	const {setAllItems} = useTherapistStore();
	const hydrated = useTherapistStore((state) => state.hydrated);
	useEffect(() => {
		if (hydrated) {
			return;
		}
		async function fetch() {
			const res = await apiService.get<Therapists[]>({
				showSuccessToast: false,
			});
			console.log(res.data);
			if (res.data) {
				setAllItems(res.data);
			}
			if (res.error) {
				setAllItems([]);
			}
		}
		fetch();
	}, []);
	return <div>{children}</div>;
}

export default FetchTherapist;
