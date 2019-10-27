import React from "react";

import Chat from "./Chat";
import UserContext from "context";
import useCurrentUser from "hooks/useCurrentUser";

function App() {
	const { user, getUser, logout } = useCurrentUser();

	React.useEffect(() => {
		getUser();
	}, [getUser]);

	function renderContent() {
		if (user) {
			return <Chat user={user} />;
		} else {
			return (
				<div className="ui active dimmer">
					<div className="ui text loader">Connecting</div>
				</div>
			);
		}
	}

	return (
		<UserContext.Provider value={{ user, getUser, logout }}>
			{renderContent()}
		</UserContext.Provider>
	);
}

export default App;
