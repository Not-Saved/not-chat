import { useState, useCallback } from "react";
import { apiRequest } from "../api";

export default function useCurrentUser() {
	const [user, setUser] = useState(null);
	const [error, setError] = useState();

	const getUser = useCallback(async () => {
		try {
			let response = await apiRequest({
				method: "get",
				url: "/current_user"
			});
			if (
				response.data &&
				!response.data.rooms.includes("5db0a60c89a5582114d5c2e3")
			) {
				response = await apiRequest({
					method: "post",
					url: "/rooms/5db0a60c89a5582114d5c2e3"
				});
			}
			setUser(response.data);
		} catch (e) {
			setError(e);
		}
	}, [setUser]);

	const logout = useCallback(async () => {
		setUser(null);

		await apiRequest({
			method: "get",
			url: "/logout"
		});
	}, [setUser]);

	return { user, error, getUser, logout };
}
