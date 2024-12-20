import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
function DialogComp({
	children,
	content,
    title
}: {
	children: React.ReactNode;
	content: React.ReactNode;
    title:string;
}) {
	return (
		<Dialog>
			<DialogTrigger>
				{children}
			</DialogTrigger>
			<DialogContent className="max-h-[80dvh] overflow-auto scrollbar">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{content}
			</DialogContent>
		</Dialog>
	);
}

export default DialogComp;
