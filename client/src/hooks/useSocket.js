import React from "react";
import io from "socket.io-client";

function joinRoom(socket, room) {
	socket.emit("join_room", room);
}

function sendMessage(socket, msg) {
	socket.emit("message", "5db0a60c89a5582114d5c2e3", msg);
}

export default function(initialMessages = []) {
	const [state, dispatch] = React.useReducer(reducer, initialMessages);
	const [socket] = React.useState(() => io.connect("localhost:5000"));

	React.useEffect(() => {
		if (socket) {
			joinRoom(socket, "5db0a60c89a5582114d5c2e3");
			socket.on("message", msg => {
				dispatch({ type: "MESSAGE", payload: msg });
			});
		}
	}, [socket]);

	return { messages: state, sendMessage, joinRoom };
}

function reducer(state, action) {
	switch (action.type) {
		case "MESSAGE":
			return [...state, action.payload];
		default:
			return state;
	}
}
