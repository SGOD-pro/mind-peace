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