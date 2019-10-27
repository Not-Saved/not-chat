import axios from "axios";

const api = axios.create({
	baseURL: "/api"
});

export const apiRequest = async config => {
	try {
		const response = await api.request(config);
		return response;
	} catch (e) {
		throw e;
	}
};
