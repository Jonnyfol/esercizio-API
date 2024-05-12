import GoogleStrategy from "passport-google-oauth20";
import User from "../models/user.models.js";
import { generateJWT } from "../auth/index.js";
import { config } from "dotenv";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.G_CLIENT_ID,
    clientSecret: process.env.SECRET,
    callbackURL: process.env.G_CB,
  },
  async (_, __, profile, passportNext) => {
    try {
      const { email, given_name, family_name, sub } = profile._json;
      const user = await User.findOne({ email });
      console.log(User);
      if (user) {
        const accToken = await generateJWT({
          _id: user._id,
        });
        passportNext(null, { accToken });
      } else {
        const newUser = new User({
          name: given_name,
          lastName: family_name,
          email: email,
          username: given_name,
          googleId: sub,
        });
        await newUser.save();
        console.log(newUser);
        const accToken = await generateJWT({
          lastName: newUser.lastName,
          email: newUser.email,
        });
        passportNext(null, { accToken });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

export default googleStrategy;
