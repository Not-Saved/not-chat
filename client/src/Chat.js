import React from "react";
import useSocket from "hooks/useSocket";

import "./chat.css";

function Chat({ user }) {
	const { messages, sendMessage } = useSocket();
	const [message, setMessage] = React.useState("");

	function renderMessages() {
		return messages.map((message, idx) => (
			<Message key={idx} message={message} user={user} />
		));
	}

	function onKeyPress(e) {
		if (e.key === "Enter" && e.target.value) {
			sendMessage(e.target.value);
			setMessage("");
		}
	}

	return (
		<div className="chat">
			<div className="top">
				<div className="icon container">
					<i className="paper plane icon"></i>
				</div>
				<div className="text">Chat</div>
			</div>
			<div className="middle">
				<div className="ui small feed">{renderMessages()}</div>
			</div>
			<div className="bottom">
				<div className="ui icon input">
					<input
						type="text"
						placeholder="Type..."
						value={message}
						onChange={e => setMessage(e.target.value)}
						onKeyPress={onKeyPress}
					/>
					<i className="send icon"></i>
				</div>
			</div>
		</div>
	);
}

function Message({ message, user }) {
	return (
		<div className={`${isMessageCreator(message, user)}event`}>
			<div className="content">
				<div className="summary">
					<div className="ui basic label">
						<strong>{message.user.userName}</strong>: {message.content}
					</div>
				</div>
			</div>
		</div>
	);
}

function isMessageCreator(message, user) {
	return message.user.id === user.id ? "creator " : "";
}

export default Chat;
