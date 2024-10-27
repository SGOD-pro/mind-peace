type SuccessResponse<T> = {
	success: true;
	data: T;
	message?: string;
};

type ErrorResponse = {
	success: false;
	error: string;
	message?: string;
};

class ApiResponse {
	static success<T>({
		data,
		statusCode= 200,
		message,
	}:{data: T; statusCode?: number; message?: string}): Response {
		const responseBody: SuccessResponse<T> = {
			success: true,
			data,
			message,
		};

		return Response.json({ ...responseBody }, { status: statusCode });
	}
	static error({
		message,
		statusCode = 400,
	}: {
		message: string;
		statusCode: number;
	}): Response {
		const responseBody: ErrorResponse = {
			success: false,
			error: message,
		};
		return Response.json({ ...responseBody }, { status: statusCode });
	}
}

export default ApiResponse;