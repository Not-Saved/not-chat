import { useState, useEffect, useReducer } from "react";
import io from "socket.io-client";

export default function(initialMessages = []) {
	const [messages, messageDispatch] = useReducer(messageReducer, initialMessages);
	const [onlineUsers, setOnlineUsers] = useState([]);

	const [socket] = useState(() => io.connect("", { path: "/ws/socket.io" }));

	function joinRoom(room) {
		socket.emit("join_room", room);
	}

	function sendMessage(msg) {
		socket.emit("message", "5db0a60c89a5582114d5c2e3", msg);
	}

	useEffect(() => {
		socket.on("message", msg => {
			messageDispatch({ type: "MESSAGE", payload: msg });
		});
		socket.on("online_users", ({ room, users }) => {
			if (room === "5db0a60c89a5582114d5c2e3") setOnlineUsers(users);
		});
		return () => socket.disconnect();
	}, [socket]);

	return { messages, sendMessage, joinRoom, onlineUsers };
}

function messageReducer(state, action) {
	switch (action.type) {
		case "MESSAGE":
			return [...state, action.payload];
		default:
			return state;
	}
}
