const express = require("express");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const auth = require("./auth");

const app = express();

app.use(
  session({
    secret: "very secret 12345",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(auth.initialize);
app.use(auth.session);
app.use((req, res, next) => {
  req.session.count = req.session.count ? req.session.count + 1 : 0;
  console.log("ID", req.sessionID);
  next();
});

// fake database
const users = [
  {
    id: "123",
    username: "Dashie",
    password: "5hlomoI5H0T",
    paymentProcessed: false,
  },
];

app.post("/login", (req, res, next) => {
  // the user is set on the session
  req.login(users[0], function (err, r) {
    if (err) {
      return next(err);
    }
    console.log(`user logged in`);
    return res.status(201).send();
  });
});
app.delete("/logout", async (req, res, next) => {
  await req.logout();
  req.session.user = null;

  return res.status(201).send();
});

app.get("/users/current", (req, res, next) => {
  let user;
  if (req.user) {
    user = { ...req.user };
    delete user.password;
  }
  console.log(user || { message: "not logged in" });
  res.status(200).send(user || { message: "not logged in" });
});

(async () =>
  mongoose.connect("mongodb://localhost/setUser", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }))()
  .then(() => {
    console.log(`Connected to MongoDB set user test`);
    app.listen(4001).on("listening", () => {
      console.log("info", `HTTP server listening on port 4001`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
