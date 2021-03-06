const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

// Load User Model
const User = mongoose.model("users");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true,
        redirectURI: keys.redirectURI
      },
      (accessToken, refresh, profile, done) => {
        //console.log(accessToken);
        //console.log(profile);

        const image = profile.photos[0].value.replace("s50/", "");
        const newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          image: image
        };

        User.findOne({
          googleID: profile.id
        })
          .then(user => {
            if (user) done(null, user);
            else {
              new User(newUser).save().then(user => done(null, user));
            }
          })
          .catch();
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
};
