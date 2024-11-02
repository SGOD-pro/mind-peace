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
	role:string,
	id:string,
	avatar:string
}