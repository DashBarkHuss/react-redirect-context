const express = require("express");
const mongoose = require("mongoose");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// const authenticateUser = require('./seed/authenticateUser');
const auth = require("./auth");

const app = express();

// without body parser passport won't be able to understand the json body in the user/login POST request

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
  req.session.p = "p";
  console.log("ID", req.sessionID);
  next();
});

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:8888");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

// fake database
const users = [
  {
    id: "123",
    username: "Dashie",
    password: "5hlomoI5H0T",
    paymentProcessed: false,
  },

  // fake change in database
  {
    id: "124",
    username: "Dashie",
    password: "5hlomoI5H0T",
    paymentProcessed: true,
  },
];

app.post("/login", (req, res, next) => {
  // the user is set on the session
  req.login(users[0], function (err, r) {
    if (err) {
      return next(err);
    }
    console.log(req.session);
    console.log(`user logged in`);
    return res.status(200).send("Logged In");
  });
});
app.post("/pay", async (req, res, next) => {
  // 'Zinc' added to purchases.
  // Because we have no database in this example, we mock this by changing the req.user to users[1]
  await req.logout();
  req.session.user = null;
  req.login(users[1], function (err) {
    if (err) {
      return next(err);
    }
    console.log(`payment succeeded`, req.user);
    return res.status(201).send();
  });
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
app.get("/f", (req, res, next) => {
  res.status(200).send("popopop");
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
