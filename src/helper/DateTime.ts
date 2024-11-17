const today = new Date().getDay();
const dayMap = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const getNextDayDate = (days: string[]) => {
	const sortedDays = days.sort((a, b) => dayMap.indexOf(a) - dayMap.indexOf(b));
	for (let i = 0; i < sortedDays.length; i++) {
		const dayIndex = dayMap.indexOf(sortedDays[i]);
		if (dayIndex > today) {
			const diff = dayIndex - today;
			const nextDate = new Date();
			nextDate.setDate(nextDate.getDate() + diff);
			return nextDate;
		}
	}
	const firstDayIndex = dayMap.indexOf(sortedDays[0]);
	const diff = 7 - today + firstDayIndex;
	const nextDate = new Date();
	nextDate.setDate(nextDate.getDate() + diff);
	return nextDate;
};
