"use client";
import React, { useEffect } from "react";
import useShowLoader from "@/hooks/ShowLoader";
import ApiService from "@/helper/ApiService";
const apiService = new ApiService("/api/auth/");
import useAuthStore from "@/store/Auth";
import ShowLoginForm from "@/components/ShowLoginForm";
import LocomotiveScroll from "locomotive-scroll";
function Main({ children }: { children: React.ReactNode }) {
	const { user, ishydrated, setUser } = useAuthStore();
	const { Loader, setShow } = useShowLoader();
	useEffect(() => {
		async function sessioin() {
			if (!ishydrated) {
				setShow(true);
				const res = await apiService.post<UserWithId>({
					endpoint: "/verifySession",
					showErrorToast: false,
				});
				if (res.data) {
					setUser(res.data);
					console.log(res.data);
				}
				setShow(false);
				console.log(res);
			}
		}
		sessioin();
	}, []);
	// const loco = new LocomotiveScroll();
	return (
		<main className="bg-[#F9F9F9] w-full min-h-dvh">
			<Loader />
			<ShowLoginForm />
			{children}
		</main>
	);
}

export default Main;
