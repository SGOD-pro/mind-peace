import {
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/config/firebase";
import ApiService from "./ApiService";
const apiservise = new ApiService("/api/auth/");
import { getAuthStore } from "@/store/Auth";
const authStore = getAuthStore();
export async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const user = result.user;
		const data = {
			email: user?.email,
			avatar: user?.photoURL,
			name: user?.displayName,
			provider: "google",
		};
		const res = await apiservise.post<UserWithId>({
			endpoint: "/register",
			data,
		});
		if (res.data) {
			authStore.setUser(res.data);
		}
		console.log(res);
		return user;
	} catch (error) {
		console.error("Error during Google Sign-In:", error);
		return { success: false, error: error as Error };
	}
}
export async function verifySession() {
	// Check if user already exists in authStore, exit early if so
	if (authStore.user) return;
  
	return new Promise<void>((resolve) => {
	  const unsubscribe = onAuthStateChanged(auth, async (user) => {
		if (user) {
		  try {
			const res = await apiservise.post<UserWithId>({
			  endpoint: "/login",
			  data: {
				email: user.email,
				provider: "google",
			  },
			});
			
			if (res.data) {
			  authStore.setUser(res.data); 
			}
		  } catch (error) {
			console.error("Error in verifySession API call:", error);
		  }
		}
		resolve(); 
	  });
  
	  return () => unsubscribe();
	});
  }
