"use client";

import * as React from "react";
import {
	Command,
	LifeBuoy,
	Send,
	Home,
	Stethoscope,
	Star,
	User,
	Calendar,
	MessageSquare,
	Clock,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import useAuthStore from "@/store/Auth";

const data = {
	user: {
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	},
	navSecondary: [
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
};

const userLinks = [
	{
		title: "Profile",
		url: "/dashboard/admin",
		icon: User, // Profile icon
	},
	{
		title: "New Appointment",
		url: "/dashboard/admin",
		icon: Calendar, // Appointment icon
	},
	{
		title: "Feedback",
		url: "/dashboard/admin",
		icon: MessageSquare, // Feedback icon
	},
	{
		title: "Schedules",
		url: "/dashboard/admin",
		icon: Clock, // Schedule icon
	},
];
const therapistLinks = [
	{
		title: "Profile",
		url: "/dashboard/admin",
		icon: User, // Profile icon
	},
	{
		title: "Appointments",
		url: "/dashboard/admin",
		icon: Calendar, // Appointment icon
	},
	{
		title: "Feedbacks",
		url: "/dashboard/admin",
		icon: MessageSquare, // Feedback icon
	},
];
const navMain = [
	{
		title: "Home",
		url: "/dashboard/admin",
		icon: Home,
		isActive: true,
	},
	{
		title: "Therapists",
		url: "/dashboard/admin",
		icon: Stethoscope,
	},
	{
		title: "Reviews",
		url: "/dashboard/admin",
		icon: Star,
	},
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();
	const user = useAuthStore();
	console.log(user.user)
	React.useEffect(() => {
	  console.log(user.user)
	}, [user.user])
	
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<a href="#">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
									<Command className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">Mind peace</span>
									<span className="truncate text-xs">Enterprise</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className="scrollbar">
				<NavMain
					items={
						pathname.includes("/dashboard/admin")
							? navMain
							: pathname.includes("/dashboard/therapist")
							? therapistLinks
							: userLinks
					}
				/>
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user.user||data.user} />
			</SidebarFooter>
		</Sidebar>
	);
}