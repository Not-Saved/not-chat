let CLIENTS = [];

const checkClientsForConnected = req => {
	return CLIENTS.find(e => e.user.id === req.user.id);
};

module.exports = wss => {
	wss.on("connection", (ws, req) => {
		if (req.user) {
			const user = req.user;

			if (!checkClientsForConnected(req)) {
				CLIENTS.push({ user, ws });
			}

			ws.on("close", ws => {
				CLIENTS = CLIENTS.filter(e => e.user.id !== user.id);
			});

			ws.on("message", async msg => {
				ws.send(JSON.stringify({ message: "Hello " + user.userName }));
			});
		}
	});

	setInterval(() => {
		console.log([...wss.clients].map(e => e._socket.remoteAddress));
		CLIENTS.forEach(e => e.ws.send(JSON.stringify(CLIENTS.map(e => e.user))));
	}, 5000);
};
