import axios, { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "@/hooks/use-toast"; // Adjust this based on your toast import

interface ApiServicesResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: Error;
}
class ApiService{
	private baseUrl: string;
	private axiosInstance: AxiosInstance;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
		this.axiosInstance = axios.create({
			baseURL: this.baseUrl,
		});
	}

	private showToast({
		success,
		message,
		action,
	}: {
		success: boolean;
		message?: string;
		action: string;
	}) {
		toast({
			title: success ? "Success" : "Error",
			description: message || `${action} method completed.!`,
			variant: success ? "default" : "destructive",
		});
	}

	async get<T>({
		endpoint = "",
		showSuccessToast = true,
		showErrorToast = true,
	}: {
		endpoint?: string;
		showSuccessToast?: boolean;
		showErrorToast?: boolean;
	}): Promise<ApiServicesResponse<T>> {
		const action = "GET";
		try {
			const response: AxiosResponse<ApiServicesResponse<T>> =
				await this.axiosInstance.get(endpoint);
			const result = {
				success: response.data.success,
				data: response.data.data,
				message: response.data.message,
			};
			if (showSuccessToast)
				this.showToast({
					success: result.success,
					message: result.message,
					action,
				});
			return result;
		} catch (error: any) {
			console.log(error.response.data);
			console.log(error.message);
			const result = {
				success: false,
				error: new Error(
					error.response.data.error ||
						error.message ||
						"An unknown error occurred"
				),
			};
			if (showErrorToast)
				this.showToast({
					success: result.success,
					message: result.error.message,
					action,
				});
			return result;
		}
	}

	async post<T>({
		endpoint = "",
		data,
		showSuccessToast = true,
		showErrorToast = true,
		isMultipart = false,
	}: {
		endpoint?: string;
		data?: any;
		showSuccessToast?: boolean;
		showErrorToast?: boolean;
		isMultipart?: boolean;
	}): Promise<ApiServicesResponse<T>> {
		const action = "POST";
		try {
			const requestData = data;
			const config = {
				headers: isMultipart
					? { "Content-Type": "multipart/form-data" }
					: { "Content-Type": "application/json" },
				withCredentials: true,
			};
			const response: AxiosResponse<ApiServicesResponse<T>> =
				await this.axiosInstance.post(endpoint, requestData, config);

			const result = {
				success: response.data.success,
				data: response.data.data,
				message: response.data.message,
			};

			if (showSuccessToast) {
				this.showToast({
					success: result.success,
					message: result.message,
					action,
				});
			}

			return result;
		} catch (error: any) {
			console.log(error.response.data.error);
			const result = {
				success: false,
				error: new Error(
					error.response?.data?.message ||
						error.response.data.error ||
						error.message ||
						"An unknown error occurred"
				),
			};

			if (showErrorToast) {
				this.showToast({
					success: result.success,
					message: result.error.message,
					action,
				});
			}

			return result as ApiServicesResponse<T>;
		}
	}

	async put<T>({
		endpoint = "",
		data,
		showSuccessToast = true,
		showErrorToast = true,
	}: {
		endpoint?: string;
		data: any;
		showSuccessToast?: boolean;
		showErrorToast?: boolean;
	}): Promise<ApiServicesResponse<T>> {
		const action = "PUT";
		try {
			const response: AxiosResponse<ApiServicesResponse<T>> =
				await this.axiosInstance.put(endpoint, data);
			const result = {
				success: response.data.success,
				data: response.data.data,
				message: response.data.message,
			};
			if (showSuccessToast)
				this.showToast({
					success: result.success,
					message: result.message,
					action,
				});
			return result;
		} catch (error: any) {
			const result = {
				success: false,
				error: new Error(
					error.response?.data?.message ||
						error.response.data.error ||
						error.message ||
						"An unknown error occurred"
				),
			};
			if (showErrorToast)
				this.showToast({
					success: result.success,
					message: result.error.message,
					action,
				});
			return result as ApiServicesResponse<T>;
		}
	}

	async delete<T>({
		endpoint = "",
		showSuccessToast = true,
		showErrorToast = true,
	}: {
		endpoint?: string;
		showSuccessToast?: boolean;
		showErrorToast?: boolean;
	}): Promise<ApiServicesResponse<T>> {
		const action = "DELETE";
		try {
			const response: AxiosResponse<ApiServicesResponse<T>> =
				await this.axiosInstance.delete(endpoint);
			const result = {
				success: response.data.success,
				message: response.data.message,
			};
			if (showSuccessToast)
				this.showToast({
					success: result.success,
					message: result.message,
					action,
				});
			return result;
		} catch (error: any) {
			const result = {
				success: false,
				error: new Error(
					error.response?.data?.message ||
						error.response.data.error ||
						error.message ||
						"An unknown error occurred"
				),
			};
			if (showErrorToast)
				this.showToast({
					success: result.success,
					message: result.error.message,
					action,
				});
			return result as ApiServicesResponse<T>;
		}
	}
}

export default ApiService;
