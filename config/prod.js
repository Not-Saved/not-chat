module.exports = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_SECRET,
  VAPID: {
    public: process.env.VAPID_PUBLIC_KEY,
    private: process.env.VAPID_PRIVATE_KEY
  }
};
