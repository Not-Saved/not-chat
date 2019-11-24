const mongoose = require("mongoose");
const Message = mongoose.model("messages");

module.exports = app => {
  app.get("/api/messages", async (req, res) => {
    try {
      const { user } = req;
      const messages = await Message.find({
        room: { $in: user.rooms }
      }).populate("user");
      res.send(messages);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  app.get("/api/rooms/:id/messages", async (req, res) => {
    try {
      const { id } = req.params;
      const { offset = 0, limit = 200 } = req.query;
      const messages = await Message.find({ room: id })
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({ createdAt: -1 })
        .populate("user");
      const response = {
        hasMore: messages.length === Number(limit),
        data: messages.reverse()
      };
      res.send(response);
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
