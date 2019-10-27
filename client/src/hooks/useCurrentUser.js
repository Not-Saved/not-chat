import { useState, useCallback } from "react";
import { notChess } from "../api";

export default function useCurrentUser() {
	const [user, setUser] = useState(null);

	const getUser = useCallback(async () => {
		const response = await notChess({
			method: "get",
			url: "/current_user"
		});
		setUser(response.data);
	}, [setUser]);

	const logout = useCallback(async () => {
		setUser(null);
		await notChess({
			method: "get",
			url: "/logout"
		});
	}, [setUser]);

	return { user, getUser, logout };
}
