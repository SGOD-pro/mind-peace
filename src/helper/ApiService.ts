import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { toast } from "@/hooks/use-toast"; // Adjust this based on your toast import

interface ApiServicesResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: Error;
}
class ApiService<Tx> {
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
		showToast = true,
	}: {
		endpoint?: string;
		showToast?: boolean;
	}): Promise<ApiServicesResponse<T>> {
		const action = "GET";
		try {
			const response: AxiosResponse<ApiServicesResponse<T>> =
				await this.axiosInstance.get(endpoint);
			console.log("Data" + response.data.data);
			console.log("message" + response.data.message);
			console.log("success" + response.data.success);
			const result = {
				success: response.data.success,
				data: response.data.data,
				message: response.data.message,
			};
			if (showToast)
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
			if (showToast)
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
		showToast = true,
		isMultipart = false,
	}: {
		endpoint?: string;
		data?: any;
		showToast?: boolean;
		isMultipart?: boolean;
	}): Promise<ApiServicesResponse<T>> {
		const action = "POST";
		try {
			let requestData = data;
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

			if (showToast) {
				this.showToast({
					success: result.success,
					message: result.message,
					action,
				});
			}

			return result;
		} catch (error: any) {
			const result = {
				success: false,
				error: new Error(
					error.response?.data?.message ||
						error.message ||
						"An unknown error occurred"
				),
			};

			if (showToast) {
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
		showToast = true,
	}: {
		endpoint?: string;
		data: any;
		showToast?: boolean;
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
			if (showToast)
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
						error.message ||
						"An unknown error occurred"
				),
			};
			if (showToast)
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
		showToast = true,
	}: {
		endpoint?: string;
		showToast?: boolean;
	}): Promise<ApiServicesResponse<T>> {
		const action = "DELETE";
		try {
			const response: AxiosResponse<ApiServicesResponse<T>> =
				await this.axiosInstance.delete(endpoint);
			const result = {
				success: response.data.success,
				message: response.data.message,
			};
			if (showToast)
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
						error.message ||
						"An unknown error occurred"
				),
			};
			if (showToast)
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
