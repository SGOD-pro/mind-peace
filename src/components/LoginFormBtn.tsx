"use client";
import React, { memo, useEffect } from "react";
import { Button } from "./ui/button";
import { useLoginForm } from "@/store/LoginForm";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { LogOut } from "lucide-react";
import Link from "next/link";
import useAuthStore from "@/store/Auth";
import { verifySession } from "@/helper/LoginWithGoogle";

function LoginFormBtn() {
	const { setIsOpen } = useLoginForm();
	const { user, ishydrated } = useAuthStore();
	useEffect(() => {
		if (!ishydrated) {
			verifySession();
		}
	}, []);
	return (
		<>
			{!user ? (
				<Button
					variant="outline"
					className="bg-transparent  border-[#410041] rounded-lg hover:bg-[#410041] hover:text-white text-xl font-semibold login-btn"
					onClick={() => setIsOpen(true)}
				>
					Sign In/Up
				</Button>
			) : (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div className="w-10 h-10 border p-1 border-[#410041] rounded-full overflow-hidden">
							<Image
								src={
									user?.avatar ||
									"https://imgs.search.brave.com/MMkxHwgzwk6QqSayQnY2xfHf-25v5f1EDRPuclBEydQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waWN0dXJlLWRv/Y3Rvci13aXRoLWds/YXNzZXMtc3RldGhv/c2NvcGVfMTEwMzI5/MC0xMTI4NTEuanBn/P3NpemU9NjI2JmV4/dD1qcGc"
								}
								alt="logo"
								width={50}
								height={50}
								className="w-full h-full object-cover rounded-full"
							/>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-white text-black border-[#410041]">
						<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
						<DropdownMenuSeparator className="bg-[#410041]" />
						<DropdownMenuItem>Dashboard</DropdownMenuItem>
						<DropdownMenuItem>
							<LogOut />
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			)}
		</>
	);
}

export default memo(LoginFormBtn);
