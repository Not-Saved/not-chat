import React from "react";

const SidebarContent = ({ onlineUsers }) => {
	return (
		<div className="sidebar content">
			<h2>Online users</h2>
			{onlineUsers.map(user => (
				<div>{user}</div>
			))}
		</div>
	);
};

export default SidebarContent;
