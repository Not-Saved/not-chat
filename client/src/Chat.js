import React, { useState, useEffect, useRef } from "react";

import "./chat.css";

function Chat({ user, messages, sendMessage }) {
	const [message, setMessage] = useState("");
	const bottomElement = useRef(null);
	const inputElement = useRef(null);

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
		inputElement.current.focus();
	}

	function onButtonPress(e) {
		if (message) {
			sendMessage(message);
			setMessage("");
		}
		inputElement.current.focus();
	}

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<>
			<div className="middle">
				<div className="ui small feed">
					{renderMessages()}
					<div ref={bottomElement}></div>
				</div>
			</div>
			<div className="bottom">
				<div className="ui action icon input">
					<input
						ref={inputElement}
						type="text"
						placeholder="Type..."
						value={message}
						onChange={e => setMessage(e.target.value)}
						onKeyPress={onKeyPress}
					/>
					<button className="ui icon button" onClick={onButtonPress}>
						<i className="send icon"></i>
					</button>
				</div>
			</div>
		</>
	);
}

function Message({ message, user }) {
	function renderContent() {
		if (message.user) {
			return (
				<div className="ui basic label">
					<strong>{message.user.userName}</strong>: {message.content}
				</div>
			);
		} else {
			return <div>{message.content}</div>;
		}
	}

	return (
		<div className={`${isMessageCreator(message, user)}event`}>
			<div className="content">
				<div className="summary">{renderContent()}</div>
			</div>
		</div>
	);
}

function isMessageCreator(message, user) {
	return message.user && message.user.id === user.id ? "creator " : "";
}

export default Chat;
