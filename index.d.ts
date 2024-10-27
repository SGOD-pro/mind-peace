interface CardProps {
	description: string;
	title: string;
	src: string;
	ctaText?: string;
	content: () => React.JSX.Element;
	bgColor?: string;
}