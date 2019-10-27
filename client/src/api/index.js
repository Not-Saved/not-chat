import axios from "axios";

const notChessAxios = axios.create({
	baseURL: "/api"
});

export const notChess = async config => {
	try {
		const response = await notChessAxios.request(config);
		return response;
	} catch (e) {
		throw e;
	}
};
