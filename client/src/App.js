import React, { useState } from "react";

import Chat from "./Chat";
import UserContext from "context";
import useCurrentUser from "hooks/useCurrentUser";
import useWindowSize from "hooks/useWindowSize";
import { apiRequest } from "./api";

function App() {
	const { user, error, getUser, logout } = useCurrentUser(null);
	const [messages, setMessages] = useState(null);
	useWindowSize();

	async function getMessages(roomId) {
		const response = await apiRequest({ url: `rooms/${roomId}/messages` });
		setMessages(response.data);
	}

	async function loadInitialsData() {
		await getUser();
		await getMessages("5db0a60c89a5582114d5c2e3");
	}

	React.useEffect(() => {
		loadInitialsData();
	}, []);

	function renderContent() {
		if (user && messages) {
			return <Chat user={user} chatMessages={messages} />;
		} else if (error) {
			window.location.href = "/oauth/google";
		} else {
			return (
				<div className="ui active dimmer">
					<div className="ui text loader">Connecting</div>
				</div>
			);
		}
	}

	return (
		<UserContext.Provider value={{ user, error, getUser, logout }}>
			{renderContent()}
		</UserContext.Provider>
	);
}

export default App;
