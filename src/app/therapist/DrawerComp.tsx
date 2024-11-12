"use client";
import React from "react";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

function DrawerComp({
	trigger,
	content,
}: {
	trigger: React.ReactNode;
	content: React.ReactNode;
}) {
	return (
		<Drawer>
			<DrawerTrigger>{trigger}</DrawerTrigger>
			<DrawerContent >
				{content}
				
			</DrawerContent>
		</Drawer>
	);
}

export default DrawerComp;
