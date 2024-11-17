import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import NewTherapist from "@/email/NewTherapist";
import AppointmentComfirm from "@/email/AppointmentComfirm";

const handleNewTherapist = async (data:string): Promise<string> => {
    return render(NewTherapist(data)); 
};

const handleNewUser = async (data: any): Promise<string> => {
    // return render(NewUser(data));
	return ""
};

const handleResetPassword = async (data: any): Promise<string> => {
    // return render(ResetPassword(data)); 
	return ""
};

const handleNewAppointment = async (data: any): Promise<string> => {
    return render(AppointmentComfirm(data)); 
};
type EmailDataMap = {
    newTherapist: string; 
    newUser: { name: string; email: string }; 
    resetPassword: { token: string }; 
    newAppointment: { appointmentId: string; date: string };
};


type SendMailProps<T extends keyof EmailDataMap> = {
    type: T;
    data: EmailDataMap[T];
    recipientEmail: string;
};

const emailHandlers: {
    [K in keyof EmailDataMap]: (data: EmailDataMap[K]) => Promise<string>;
} = {
    newTherapist: handleNewTherapist,
    newUser: handleNewUser,
    resetPassword: handleResetPassword,
    newAppointment: handleNewAppointment,
};;
export async function SendMail<T extends keyof EmailDataMap>({
    type,
    data,
    recipientEmail,
}: SendMailProps<T>): Promise<{ success: boolean; error?: Error }> {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const emailHtml = await emailHandlers[type](data);

        const mailOptions = {
            from: '"Mind Peace" <mindpeace@india.com>',
            to: recipientEmail,
            subject: `Notification: ${type}`,
            html: emailHtml,
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: error as Error };
    }
}
