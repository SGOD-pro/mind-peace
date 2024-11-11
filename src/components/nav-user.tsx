"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./ui/them-toggle";
import LogoutBtn from "./LogoutBtn";
import Image from "next/image";

export function NavUser({
	user,
}: {
	user: {
		email: string;
		avatar: string;
	};
}) {
	const { isMobile } = useSidebar();
	console.log(user.avatar);
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								{user.avatar ? (
									<Image
										src={user.avatar}
										alt={user.email[0]}
										width={50}
										height={50}
										className="w-full h-full object-cover object-top"
									></Image>
								) : (
									<AvatarFallback className="rounded-lg">MP</AvatarFallback>
								)}
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<Image
										src={user.avatar}
										alt={user.email[0]}
										width={50}
										height={50}
										className="w-full h-full object-cover"
									></Image>
									<AvatarFallback className="rounded-lg">MP</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<ModeToggle />
							</DropdownMenuItem>
						</DropdownMenuGroup>

						<DropdownMenuSeparator />

						<DropdownMenuItem>
							<LogoutBtn className="w-full h-full flex items-center gap-2">
								<LogOut />
								Log out
							</LogoutBtn>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
