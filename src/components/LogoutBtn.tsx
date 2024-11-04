import ApiService from "@/helper/ApiService";
import { logout } from "@/helper/LoginWithGoogle";
import { getAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React from "react";
const apiService = new ApiService("/api/auth/");
function LogoutBtn({
	className,
	children,
}: {
	className?: HTMLElement["className"];
	children: React.ReactNode;
}) {
	const router = useRouter();
	const signout = async () => {
		const authStore = getAuthStore();
		console.log(authStore.user)
		if (authStore.user?.provider === "google") {
			await logout();
		}
		await apiService.post({ endpoint: "/logout" });
		authStore.setUser(null);
		router.push("/");
	};
	return (
		<button className={`w-full h-full ${className}`} onClick={signout}>
			{children}
		</button>
	);
}

export default LogoutBtn;
