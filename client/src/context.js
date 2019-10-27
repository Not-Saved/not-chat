import React from "react";

export default React.createContext({
	user: null,
	getUser: () => null,
	postUser: () => null,
	logout: () => null,
	validateUser: () => null
});
