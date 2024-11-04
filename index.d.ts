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