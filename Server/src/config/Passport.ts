import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/UserSchema.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {

            console.log("Google profile email:", profile.emails?.[0]?.value);
            console.log("Google profile id:", profile.id);

        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

            console.log("Found by googleId:", user);

        if (user) return done(null, user);

        const email = profile.emails?.[0]?.value.toLowerCase();
        console.log("Extracted email:", email);
        if (!email) {
          return done(new Error("Google profile has no email address"));
        }

        // Check if email already registered normally
        const existing = await User.findOne({ email });
        console.log("Found by email:", existing);

        if (existing) {
          // Link Google to existing account
          existing.googleId = profile.id;
         
            existing.isVerified = true;

          await existing.save();
             console.log("Linked existing account");
          return done(null, existing);
        }

        // Create new user
        const avatar = profile.photos?.[0]?.value ?? "";

        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email,
          avatar,
        });

         console.log("Creating new Google user");

        return done(null, user);
      } catch (err) {
        console.error(err);
        return done(err);
      }
    },
  ),
);

export default passport;
