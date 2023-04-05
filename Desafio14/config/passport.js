const Contenedor = require("../containers/authContainer.js");
const Users = new Contenedor("users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const saltRounds = 2;

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          try {
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Incorrect username or password.",
              });
            }
          } catch (err) {
            return done(err);
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      //otrosField:"otros"
    },
    async (email, password, done) => {
      // Look for email coincidence
      const users = await Users.getAll();
      const userFound = users.find((user) => user.email === email);
      if (userFound) {
        return done(null, false);
      }

      // Saving a New User
      //console.log(otros)
      const passwordEncrypt = await bcrypt.hash(password, saltRounds);
      const user = { email, password: passwordEncrypt };
      const userSave = await Users.save(user);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
  const users = await Users.getAll();
  const user = users.find((user) => user.email === email);
  done(null, user);
});

module.exports = passport;
