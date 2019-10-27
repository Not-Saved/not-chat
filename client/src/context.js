import React from "react";

export default React.createContext({
	user: null,
	error: null,
	getUser: () => null,
	postUser: () => null,
	logout: () => null,
	validateUser: () => null
});
