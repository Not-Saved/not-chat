const _ = require("lodash");
const mongoose = require("mongoose");
const Message = mongoose.model("messages");
const User = mongoose.model("users");
const Room = mongoose.model("rooms");

const webpush = require("web-push");

const simpleStore = require("../../misc/simpleStore");

const [connections, addSocket, removeSocket] = simpleStore();
const [rooms, addRoom, removeRoom] = simpleStore();

module.exports = io => {
  io.on("connection", function(socket) {
    const user = socket.request.user;

    if (user) {
      const server = { io, socket, user };
      addSocket(user.id, socket.id);

      //socket.on("join_room", room => onJoinRoom(server, { room}));
      joinRooms(server);

      socket.on("disconnecting", () => onDisconnect(server));

      socket.on("message", (room, msg) => onMessage(server, { room, msg }));
    }
  });
};

async function onJoinRoom({ io, socket, user }, { room }) {
  try {
    const fetchedUser = await User.findById(user.id);
    if (!fetchedUser.rooms.includes(room)) throw new Error("User not in room");
    socket.join(room);
    addRoom(room, user.id);
    io.to(room).emit("online_users", {
      room: room,
      users: _.uniq(rooms[room])
    });
  } catch (e) {
    socket.emit("errors", e.message);
  }
}

function joinRooms({ io, socket, user }) {
  user.rooms.forEach(room => {
    socket.join(room);
    addRoom(room, user.id);
    io.to(room).emit("online_users", {
      room: room,
      users: _.uniq(rooms[room])
    });
  });
}

function onDisconnect({ io, socket, user }) {
  const userRooms = Object.values(socket.rooms);
  userRooms.forEach(room => {
    removeRoom(room, user.id);
    io.to(room).emit("online_users", {
      room: room,
      users: _.uniq(rooms[room])
    });
  });
  removeSocket(user.id, socket.id);
}

async function onMessage({ io, user }, { room, msg }) {
  try {
    if (user.rooms.includes(room)) {
      const dbRoom = await Room.findOne({ _id: room }).populate("users");
      const payload = JSON.stringify({
        title: dbRoom.name,
        userName: user.userName,
        body: msg,
        icon: `/static/chat-icon-teal.png`
      });

      dbRoom.users.forEach(user => {
        user.pushSubscriptions.forEach(sub => {
          webpush.sendNotification(JSON.parse(sub), payload);
        });
      });

      const message = await new Message({
        user: user,
        room: room,
        content: msg
      }).save();
      io.to(room).emit("message", message);
    }
  } catch (e) {
    console.log(e);
  }
}
