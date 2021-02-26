const passport = require("passport");
// const LocalStrategy = require("passport-local");

// fake database for this example
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

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    console.log(id);

    // in a real application we would search a database ex: const user = await UserModel.findById(id).exec();
    const user = users.find((u) => u.id === id);
    return done(null, user);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

module.exports = {
  initialize: passport.initialize(),
  session: passport.session(),
};
