"use client";
import React, {  useEffect, useState } from "react";
import ApiService from "@/helper/ApiService";
const apiService = new ApiService("/api/auth/");
import useAuthStore from "@/store/Auth";
import ShowLoginForm from "@/components/ShowLoginForm";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loading from "./loading";

function Main({ children }: { children: React.ReactNode }) {
	const pathname =usePathname();
	const showNavbarAndFooter = ["/", "/therapist", "/about"].includes(pathname);
	const { ishydrated, setUser } = useAuthStore();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function session() {
			if (!ishydrated) {
				setLoading(true);
				const res = await apiService.post<UserWithId>({
					endpoint: "/verifySession",
					showErrorToast: false,
				});
				if (res.data) {
					setUser(res.data);
				}
				setLoading(false);
				console.log(res);
			}
		}
		session();
	}, []);
	return (
		<main className="bg-[#F9F9F9] w-full min-h-dvh">
			{loading && <Loading />}
			<ShowLoginForm />
			{showNavbarAndFooter && <Navbar />}
			{children}
			{showNavbarAndFooter && <Footer />}
		</main>
	);
}

export default Main;
