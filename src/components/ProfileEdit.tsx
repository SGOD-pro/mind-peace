import ApiService from "@/helper/ApiService";
import Image from "next/image";
import React, { memo, useState } from "react";
const apiService = new ApiService("/api");
import useAuthStore from "@/store/Auth";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
const ProfileEdit = () => {
	const [disable, setDisable] = useState(false);
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	async function updatePic(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) {
			return;
		}
		setDisable(true);
		const res = await apiService.post<UserWithId>({
			endpoint: "/auth/picture",
			isMultipart: true,
			data: { file },
		});
		if (res.data) {
			setUser(res.data);
		}
		setDisable(false);
	}
	return (
		<div className="">
			<div className="flex gap-4 items-center">
				<label
					htmlFor="picture"
					className="w-36 h-36 p-2 border-2 border-muted-foreground overflow-hidden rounded-full relative cursor-pointer "
				>
					{user?.avatar ? (
						<Image
							src={user?.avatar}
							alt="profile"
							width={400}
							height={400}
							className="rounded-full w-full h-full object-top object-cover pointer-events-none"
						></Image>
					) : (
						<div className="rounded-full w-full h-full bg-muted-foreground text-muted flex items-center justify-center">
							<h2 className="text-center text-7xl font-lemon leading-none">
								{user?.email[0] || "MP"}
							</h2>
						</div>
					)}
					<input
						type="file"
						className="invisible"
						id="picture"
						name="picture"
						onChange={updatePic}
						accept="image/*"
						disabled={disable}
					/>
					{disable && (
						<div className="absolute grid place-items-center w-full h-full bg-slate-400/20 text-white top-0 left-0">
							<LoaderCircle size={50} className="animate-spin" />
						</div>
					)}
				</label>
				<div className="">
					<p className="text-sm leading-none">Email:</p>
					<h2 className="text-xl text-center leading-none">{user?.email}</h2>
					<label htmlFor="picture" className="cursor-pointer">
						<Button className="mt-4 pointer-events-none">Change Photo</Button>
					</label>
				</div>
			</div>
		</div>
	);
};

export default memo(ProfileEdit);
