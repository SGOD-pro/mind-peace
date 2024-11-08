interface CardProps {
	description: string;
	title: string;
	src: string;
	ctaText?: string;
	content: () => React.JSX.Element;
	bgColor?: string;
}

interface UserWithId{
	email:string,
	role:number,
	id:string,
	avatar:string
	provider:string;
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