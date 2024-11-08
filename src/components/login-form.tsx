"use client";
import Image from "next/image";
import { memo, useState } from "react";
import Signin from "./forms/Signin";
import Signup from "./forms/Signup";
import { signInWithGoogle } from "@/helper/LoginWithGoogle";

function LoginForm() {
	const [isCreateAccount, setIsCreateAccount] = useState(false);

	return (
		<div className="relative max-w-[400px] bg-[#ffe8ea] rounded-3xl min-h-96 px-6 py-9 overflow-hidden shadow-md shadow-black/60 text-black">
			<div className="w-full h-full ">
				<div
					className={`flex w-[calc(200%+2rem)] gap-4 flex-nowrap transition-transform duration-500 ease-in-out justify-between ${
						isCreateAccount ? "transform -translate-x-[calc(50%+.5rem)]" : ""
					}`}
				>
					<Signin />
					<Signup />
				</div>
			</div>
			{/* Toggle Button */}
			<div className="w-full mt-4 pr-2">
				<button
					type="button"
					className="bg-[#ffffff] shadow shadow-black/20 hover:shadow-none transition-colors rounded-xl flex items-center justify-center gap-2 h-9 px-4 py-2 w-full"
					onClick={signInWithGoogle}
				>
					<Image src={"/google.svg"} alt="Google" width={20} height={20} />
					<span>Google</span>
				</button>
				<p className="text-center text-sm mt-4">
					{isCreateAccount
						? "Already hava an account! "
						: "You don't have an account? "}

					<span
						onClick={() => setIsCreateAccount(!isCreateAccount)}
						className="text-[#eb6270] underline cursor-pointer"
					>
						{isCreateAccount ? "Sign Up" : "Create new Account"}
					</span>
				</p>
			</div>
		</div>
	);
}
export default memo(LoginForm);
