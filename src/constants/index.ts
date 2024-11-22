export const options = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	maxAge: 60 * 60 * 7,
	path: "/",
};
export const links = [
	{ href: "/", label: "Home" },
	{ href: "/therapist", label: "Therapist" },
	{ href: "/about", label: "About" },
];
export const jokes = [
	"When your brain won’t shut up, just say, “New phone, who dis?” – Ignoring stress like a pro.",
	`Turn your overthinking into an imaginary board meeting – "Thank you, Anxiety, but your idea to panic is rejected."`,
	`When you're angry, talk to a pillow—it’ll always agree with you – Bonus: Great listener and a soft place to punch.`,
	`Schedule a “Meeting with My Inner Child” and bring cookies – Apologize for adulthood with snacks.`,
	`Name your brain “Karen” when it gets too bossy – Politely tell it to mind its own business.`,
	`Remember, a little laughter goes a long way—your brain loves a good joke!`,
];
export const greetings = {
	morning: "Good Morning, Buddy!",
	workingHours: "Stay Focused, Boss!",
	evening: "Good Evening, Friend!",
	night: "Sweet Dreams, Mate!",
  };