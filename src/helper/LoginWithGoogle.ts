import {
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/config/firebase";

// TODO: add apiservise for save the info into db besically call the login route after that save in the info in store in client side..!
export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		return user;
	} catch (error) {
		console.error("Error during Google Sign-In:", error);
		return { success: false, error: error as Error };
	}
}
export async function verifySession() {
	return new Promise<void>((resolve) => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				return user;
			}
			return null;
		});
		return () => unsubscribe();
	});
}
