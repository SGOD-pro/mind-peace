import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

function SheetComp({trigger,content,title}:{trigger:React.ReactNode;content:React.ReactNode;title?:string}) {
	return (
		<Sheet >
			<SheetTrigger>{trigger}</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{title}</SheetTitle>
					<SheetDescription>
						{content}
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}

export default SheetComp;
