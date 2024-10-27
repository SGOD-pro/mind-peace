import React, { memo } from "react";
import { Button } from "./ui/button";
import { useLoginForm } from "@/store/LoginForm";
function LoginFormBtn() {
    const { setIsOpen } = useLoginForm();
	return (
		<Button
			variant="outline"
			className="bg-transparent  border-[#410041] rounded-lg hover:bg-[#410041] hover:text-white text-xl font-semibold login-btn"
			onClick={() => setIsOpen(true)}
		>
			Sign In/Up
		</Button>
	);
}

export default memo(LoginFormBtn);
