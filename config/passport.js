const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

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
        console.log(accessToken);
        console.log(profile);
      }
    )
  );
};