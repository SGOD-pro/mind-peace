import React from "react";
function CalenderComp() {
	const date = new Date();
	return (
		<div className="flex justify-between items-end">
			<h4 className="text-2xl">Today{`'`}s Patients</h4>
			<h4 className="text-right font-lexend-exa">
				{date?.toLocaleDateString("en-US")}
			</h4>
		</div>
	);
}

export default CalenderComp;
