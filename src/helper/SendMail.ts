import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import  NewTherapist  from '@/email/NewTherapist';


export async function SendMail({type, data,recipientEmail}:{type:string,data?:any,recipientEmail:string}) {
	try {
		// Create a Nodemailer transporter using Gmail SMTP
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL_USER, // Your Gmail address
				pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app password (or OAuth2 token)
			},
		});

		// Render the email component as HTML
		const emailHtml = render(<NewTherapist>);

		// Email options
		const mailOptions = {
			from: '"Your App Name" <your-email@gmail.com>',
			to: recipientEmail,
			subject: "Welcome to Our Service!",
			html: emailHtml,
		};

		// Send the email
		await transporter.sendMail(mailOptions);
		return {success:true}

	} catch (error) {
		console.error("Failed to send email:", error);
		return {success:false,error:error as Error}
	}
}
