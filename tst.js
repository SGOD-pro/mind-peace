const days = ["Sunday", "Friday"];
const today = new Date().getDay();
const dayMap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getNextDayDate = (days) => {
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
    const diff = (7 - today) + firstDayIndex;
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + diff);
   const d=nextDate.toLocaleDateString();
   return d
};
console.log("Next day date:", getNextDayDate(days).toLocaleDateString());
