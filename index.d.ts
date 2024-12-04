interface CardProps {
	description: string;
	title: string;
	src: string;
	ctaText?: string;
	content: () => React.JSX.Element;
	bgColor?: string;
}

interface UserWithId {
	email: string;
	role: number;
	_id: string;
	avatar: string;
	provider: string;
}

interface TherapistFormInterface {
	name: string;
	qualification: string;
	experience: number;
	speciality: string;
	email: string;
	contactNo: string;
	timing: {
		from: string;
		to: string;
	};
	days: string[];
	clinicLocation: string;
	charges: number;
	image?: string;
}
interface Therapists extends TherapistFormInterface {
	_id: string;
}

interface TherapistBooking {
	_id: string;
	name: string;
	speciality: string;
	timing: string;
	rating?: number;
	charges: number;
	image: string;
	status?:"pending";
}
interface TiltDiv extends HTMLDivElement {
	vanillaTilt?: {
		destroy: () => void;
	};
}
interface AccessTokenPayload extends JwtPayload {
	_id: string;
	role: number;
	email: string;
	provider: string;
}