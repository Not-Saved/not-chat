const webpush = require("web-push");

module.exports = app => {
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscription = req.body;
      res.status(201).json({});

      const payload = JSON.stringify({
        title: "Not-Chat",
        body: "Subscribed to push notification!",
        icon: `${req.headers.origin}/static/chat-icon-teal.png`
      });

      //ADD SUBSCRIPTION TO USER ENTITY

      await webpush.sendNotification(subscription, payload);
    } catch (e) {
      console.error(e);
    }
  });
};
