import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import NewTherapist from "@/email/NewTherapist";

export async function SendMail<T>({
	type,
	data,
	recipientEmail,
}: {
	type: string;
	data?: T;
	recipientEmail: string;
}) {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL_USER, 
				pass: process.env.GMAIL_APP_PASSWORD, 
			},
		});
		const emailHtml =await render(NewTherapist(data));

		const mailOptions = {
			from: '"Mind Peace" <mindpeace@india.com>',
			to: recipientEmail,
			subject: "Welcome to Our Service!",
			html: `${emailHtml}`,
		};

		// Send the email
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (error) {
		console.error("Failed to send email:", error);
		return { success: false, error: error as Error };
	}
}
