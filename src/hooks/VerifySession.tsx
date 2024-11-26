import React, { useEffect, useState } from "react";
import ApiService from "@/helper/ApiService";
const apiService = new ApiService("/api/auth/");
import useAuthStore from "@/store/Auth";
import Loading from "@/app/loading";
function VerifySession({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
	const { ishydrated, setUser } = useAuthStore();
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
	if (loading) {
		return <Loading />;
	}
	return { children };
}

export default VerifySession;
