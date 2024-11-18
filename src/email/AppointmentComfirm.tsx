import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "";

export const AppointmentComfirm = (data:{appointmentId:string,date:string}) => (
	<Html>
		<Head />
		<Preview>Thank you for trust us!</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={track.container}>
					<Row>
						<Column>
							<Text style={global.paragraphWithBold}>Appointment ID</Text>
							<Text style={track.number}>{data.appointmentId}</Text>
						</Column>
						<Column align="right">
							<Link style={global.button}>Track Package</Link>
						</Column>
					</Row>
				</Section>
				<Hr style={global.hr} />
				<Section style={message}>
					<Img
						src={`${baseUrl}/static/nike-logo.png`}
						width="66"
						height="22"
						alt="Nike"
						style={{ margin: "auto" }}
					/>
					<Heading style={global.heading}>It's On Its Way.</Heading>
					<Text style={global.text}>
						You order's is on its way. Use the link above to track its progress.
					</Text>
					<Text style={{ ...global.text, marginTop: 24 }}>
						We{`'`}ve also charged your payment method for the cost of your order
						and will be removing any authorization holds. For payment details,
						please visit your Orders page on Nike.com or in the Nike app.
					</Text>
				</Section>
				<Hr style={global.hr} />
				<Section style={global.defaultPadding}>
					<Text style={adressTitle}>Shipping to: Alan Turing</Text>
					<Text style={{ ...global.text, fontSize: 14 }}>
						2125 Chestnut St, San Francisco, CA 94123
					</Text>
				</Section>
				<Hr style={global.hr} />
				<Section
					style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
				>
					<Row>
						<Column>
							<Img
								src={`${baseUrl}/static/nike-product.png`}
								alt="Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey"
								style={{ float: "left" }}
								width="260px"
							/>
						</Column>
						<Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
							<Text style={{ ...paragraph, fontWeight: "500" }}>
								Brazil 2022/23 Stadium Away Women's Nike Dri-FIT Soccer Jersey
							</Text>
							<Text style={global.text}>Size L (12–14)</Text>
						</Column>
					</Row>
				</Section>
				<Hr style={global.hr} />
				<Section style={global.defaultPadding}>
					<Row style={{ display: "inline-flex", marginBottom: 40 }}>
						<Column style={{ width: "170px" }}>
							<Text style={global.paragraphWithBold}>Order Number</Text>
							<Text style={track.number}>C0106373851</Text>
						</Column>
						<Column>
							<Text style={global.paragraphWithBold}>Order Date</Text>
							<Text style={track.number}>Sep 22, 2022</Text>
						</Column>
					</Row>
					<Row>
						<Column align="center">
							<Link style={global.button}>Order Status</Link>
						</Column>
					</Row>
				</Section>
			</Container>
		</Body>
	</Html>
);

export default AppointmentComfirm;

const paddingX = {
	paddingLeft: "40px",
	paddingRight: "40px",
};

const paddingY = {
	paddingTop: "22px",
	paddingBottom: "22px",
};

const paragraph = {
	margin: "0",
	lineHeight: "2",
};

const global = {
	paddingX,
	paddingY,
	defaultPadding: {
		...paddingX,
		...paddingY,
	},
	paragraphWithBold: { ...paragraph, fontWeight: "bold" },
	heading: {
		fontSize: "32px",
		lineHeight: "1.3",
		fontWeight: "700",
		textAlign: "center",
		letterSpacing: "-1px",
	} as React.CSSProperties,
	text: {
		...paragraph,
		color: "#747474",
		fontWeight: "500",
	},
	button: {
		border: "1px solid #929292",
		fontSize: "16px",
		textDecoration: "none",
		padding: "10px 0px",
		width: "220px",
		display: "block",
		textAlign: "center",
		fontWeight: 500,
		color: "#000",
	} as React.CSSProperties,
	hr: {
		borderColor: "#E5E5E5",
		margin: "0",
	},
};

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "10px auto",
	width: "600px",
	maxWidth: "100%",
	border: "1px solid #E5E5E5",
};

const track = {
	container: {
		padding: "22px 40px",
		backgroundColor: "#F7F7F7",
	},
	number: {
		margin: "12px 0 0 0",
		fontWeight: 500,
		lineHeight: "1.4",
		color: "#6F6F6F",
	},
};

const message = {
	padding: "40px 74px",
	textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
	...paragraph,
	fontSize: "15px",
	fontWeight: "bold",
};


