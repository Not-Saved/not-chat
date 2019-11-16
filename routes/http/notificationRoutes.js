const mongoose = require("mongoose");
const User = mongoose.model("users");
const webpush = require("web-push");
const requireLogin = require("../../middlewares/routes/requireLogin");

module.exports = app => {
  app.post("/api/subscribe", requireLogin, async (req, res) => {
    try {
      const subscription = req.body;

      const payload = JSON.stringify({
        title: "Not-Chat",
        body: "Subscribed to push notification!",
        icon: `/static/chat-icon-teal.png`
      });

      const stringifySub = JSON.stringify(subscription);
      await webpush.sendNotification(subscription, payload);
      await User.updateOne(
        { _id: req.user.id },
        { $addToSet: { pushSubscriptions: stringifySub } }
      );
      res.status(201).json({});
    } catch (e) {
      console.error(e);
      res.status(400).send();
    }
  });
};
