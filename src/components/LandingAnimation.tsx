"use client";
import React from "react";
import DesktopVersion from "@/components/Desktop/LandingAnimation";
import MobileVersion from "@/components/Mobile/LandingAnimation";
import { useIsMobile } from "@/hooks/use-mobile";

function LandingAnimation() {
	const isMobile = useIsMobile();
	if (isMobile) {
		return <MobileVersion />;
	}
	return <DesktopVersion />;
}

export default LandingAnimation;