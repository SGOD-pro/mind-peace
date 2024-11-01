import AuthModel from "@/schema/Auth";

const generateTokens = async (
	userId: string
): Promise<{ accToken: string; refreshToken: string }> => {
	try {
		const user = await AuthModel.findById(userId);
		if (!user) {
			throw new Error("User not found");
		}
		const accToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();
		user.refreshToken = refreshToken;
		await user?.save({ validateBeforeSave: false });
		return { accToken, refreshToken };
	} catch (error) {
		throw new Error("Something went wrong");
	}
};

export default generateTokens;