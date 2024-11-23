"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathName = usePathname();
	return (
		<>
			<SidebarProvider>
				<AppSidebar className="" />
				<SidebarInset className="h-[calc(100%-16px)] w-full">
					<header className="flex h-16 shrink-0 items-center gap-2 bg-background/40 backdrop-blur-sm border-b border-border">
						<div className="flex items-center gap-2 px-4 ">
							<SidebarTrigger className="-ml-1" />
							<Separator orientation="vertical" className="mr-2 h-4" />
							<Breadcrumb>
								<BreadcrumbList>
									{pathName.split("/").map((item, index) => (
										<div key={index} className="hidden md:block">
											{index !== 0 && <BreadcrumbSeparator />}
											<BreadcrumbItem>
												<BreadcrumbLink href="#" className="capitalize">
													{item}
												</BreadcrumbLink>
											</BreadcrumbItem>
										</div>
									))}
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>
					<div className="p-4 pt-0 h-[calc(100dvh-5.2rem)] scrollbar w-full relative overflow-auto">
						{children}
					</div>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
