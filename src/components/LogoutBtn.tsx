import ApiService from "@/helper/ApiService";
import { logout } from "@/helper/LoginWithGoogle";
import { getAuthStore } from "@/store/Auth";
import React from "react";
const apiService = new ApiService("/api/auth/");
function LogoutBtn({
	className,
	children,
}: {
	className?: HTMLElement["className"];
	children: React.ReactNode;
}) {
	const signout = async () => {
		const authStore = getAuthStore();
		if (authStore.user?.provider === "google") {
			await logout();
			authStore.setUser(null);
		} else {
			await apiService.get({ endpoint: "/logout" });
			authStore.setUser(null);
		}
	};
	return <button className={`w-full h-full ${className}`}>{children}</button>;
}

export default LogoutBtn;
