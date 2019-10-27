import React from "react";
import useSocket from "hooks/useSocket";

import "./chat.css";

function Chat({ user, chatMessages }) {
	const { messages, sendMessage } = useSocket(chatMessages);
	const [message, setMessage] = React.useState("");
	const bottomElement = React.useRef(null);

	function renderMessages() {
		return messages.map((message, idx) => (
			<Message key={idx} message={message} user={user} />
		));
	}

	function scrollToBottom() {
		bottomElement.current.scrollIntoView();
	}

	function onKeyPress(e) {
		if (e.key === "Enter" && message) {
			sendMessage(message);
			setMessage("");
		}
	}

	function onButtonPress(e) {
		if (message) {
			sendMessage(message);
			setMessage("");
		}
	}

	React.useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<div className="chat">
			<div className="top">
				<div className="text">Chat</div>
			</div>
			<div className="middle">
				<div className="ui small feed">
					{renderMessages()}
					<div ref={bottomElement}></div>
				</div>
			</div>
			<div className="bottom">
				<div className="ui action icon input">
					<input
						type="text"
						placeholder="Type..."
						value={message}
						onChange={e => setMessage(e.target.value)}
						onKeyPress={onKeyPress}
					/>
					<button class="ui icon button" onClick={onButtonPress}>
						<i class="send icon"></i>
					</button>
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
