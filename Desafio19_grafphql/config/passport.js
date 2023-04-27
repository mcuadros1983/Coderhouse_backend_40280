import Users from '../persistence/authPersistence.js';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
const saltRounds = 2;

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {

      // Match Email's User
      const users = await Users.getAllUsers();
      const user = users.find((user) => user.email == email);

      if (!user) {

        return done(null, false);
      }

      // Match Password's User
      const isMatch = bcrypt.compareSync(password, user.password);
      console.log(isMatch);
      if (!isMatch)
        return done(null, false);

      return done(null, user);
    }
  )
);

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Look for email coincidence
      const users = await Users.getAllUsers();
      const userFound = users.find((user) => user.email === email);
      if (userFound) {
        return done(null, false);
      }

      // Saving a New User
      const passwordEncrypt = await bcrypt.hash(password, saltRounds);
      const user = { email, password: passwordEncrypt };
      const userSave = await Users.addUser(user);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
  const users = await Users.getAllUsers();
  const user = users.find((user) => user.email === email);
  done(null, user);
});

export default passport;
