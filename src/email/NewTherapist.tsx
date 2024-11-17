import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";


	const NewTherapist = (data:string) => (
		<Html>
			<Head />
			<Preview>Welcome to Mind Peace</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={logoContainer}>
						<Img
							src={`https://firebasestorage.googleapis.com/v0/b/academid-ledger.appspot.com/o/logos%2Flogo.png?alt=media&token=97f1cf2f-4e81-4bcb-8ff1-58939826722d`}
							width="40"
							height="40"
							alt="Mind Peace"
						/>
					</Section>
					<Heading style={h1}>Welcome to Mind Peace!</Heading>
					<Text style={heroText}>
						Congratulations! You have successfully registered as a therapist on Mind Peace. We{`'`}re excited to have you join us on this journey to make a positive impact on mental health.
					</Text>
	
					<Section style={codeBox}>
						<Text style={confirmationCodeText}>
							Your password is {data}
						</Text>
					</Section>
	
					<Text style={text}>
						Thank you for choosing to support individuals through Mind Peace. We{`'`}re here to support you every step of the way. If you need assistance or have any questions, feel free to reach out.
					</Text>
	
					<Section>
						<Row style={footerLogos}>
							<Column style={{ width: "66%" }}>
								<Img
									src={`https://firebasestorage.googleapis.com/v0/b/academid-ledger.appspot.com/o/logos%2Flogo.png?alt=media&token=97f1cf2f-4e81-4bcb-8ff1-58939826722d`}
									width="37"
									height="37"
									alt="Mind Peace"
								/>
							</Column>
							<Column>
								<Section>
									<Row>
										<Column>
											<Link href="/">
												<Img
													src={`https://static.vecteezy.com/system/resources/previews/027/395/710/non_2x/twitter-brand-new-logo-3-d-with-new-x-shaped-graphic-of-the-world-s-most-popular-social-media-free-png.png`}
													width="32"
													height="32"
													alt="Twitter"
													style={socialMediaIcon}
												/>
											</Link>
										</Column>
										<Column>
											<Link href="/">
												<Img
													src={`https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-1-2.png`}
													width="32"
													height="32"
													alt="Facebook"
													style={socialMediaIcon}
												/>
											</Link>
										</Column>
										<Column>
											<Link href="/">
												<Img
													src={`https://logospng.org/download/linkedin/logo-linkedin-icon-1024.png`}
													width="32"
													height="32"
													alt="LinkedIn"
													style={socialMediaIcon}
												/>
											</Link>
										</Column>
									</Row>
								</Section>
							</Column>
						</Row>
					</Section>
	
					<Section>
						<Link
							style={footerLink}
							href="https://mindpeace.com/blog"
							target="_blank"
							rel="noopener noreferrer"
						>
							Our Blog
						</Link>
						&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
						<Link
							style={footerLink}
							href="https://mindpeace.com/policies"
							target="_blank"
							rel="noopener noreferrer"
						>
							Policies
						</Link>
						&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
						<Link
							style={footerLink}
							href="https://mindpeace.com/help"
							target="_blank"
							rel="noopener noreferrer"
						>
							Help Center
						</Link>
						&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
						<Link
							style={footerLink}
							href="https://mindpeace.com/community"
							target="_blank"
							rel="noopener noreferrer"
							data-auth="NotApplicable"
							data-linkindex="6"
						>
							Community
						</Link>
						<Text style={footerText}>
							©2022 Mind Peace, Inc. <br />
							123 Wellness Ave, San Francisco, CA 94105, USA <br />
							<br />
							All rights reserved.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
	

export default NewTherapist;

// Styles
const footerText = {
	fontSize: "12px",
	color: "#b7b7b7",
	lineHeight: "15px",
	textAlign: "left" as const,
	marginBottom: "50px",
};

const footerLink = {
	color: "#b7b7b7",
	textDecoration: "underline",
};

const footerLogos = {
	marginBottom: "32px",
	paddingLeft: "8px",
	paddingRight: "8px",
	width: "100%",
};

const socialMediaIcon = {
	display: "inline",
	marginLeft: "32px",
};

const main = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	width: "100%",
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
	margin: "0 auto",
	padding: "0px 20px",
};

const logoContainer = {
	marginTop: "32px",
};

const h1 = {
	color: "#1d1c1d",
	fontSize: "36px",
	fontWeight: "700",
	margin: "30px 0",
	padding: "0",
	lineHeight: "42px",
};

const heroText = {
	fontSize: "20px",
	lineHeight: "28px",
	marginBottom: "30px",
};

const codeBox = {
	background: "rgb(245, 244, 245)",
	borderRadius: "4px",
	marginBottom: "30px",
	padding: "40px 10px",
};

const confirmationCodeText = {
	fontSize: "35px",
	textAlign: "center" as const,
	verticalAlign: "middle",
};

const text = {
	color: "#000",
	fontSize: "14px",
	lineHeight: "24px",
};
